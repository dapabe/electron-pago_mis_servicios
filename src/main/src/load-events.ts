import { IpcEvent } from '#shared/constants/ipc-events'
import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import { Sequence } from './sequence/Sequence'
import { AppStore } from './app-store'
import { FlagConfigManager, IFlagConfig } from '#shared/schemas/flags.schema'

export async function loadBrowserEvents(browser: BrowserWindow) {
  /**
   *  Custom application behaviour
   */
  ipcMain.on(IpcEvent.ToggleMaximize, () => {
    if (browser.isMinimized()) browser.maximize()
    else browser.minimize()
  })

  /**
   *  Initial application ipc events
   */
  browser.webContents.once('did-finish-load', () => {
    browser.webContents.send(IpcEvent.AppVersion, app.getVersion())
    browser.webContents.send(IpcEvent.Config.SendInitialConfig, AppStore.getState().fileData)
  })

  globalShortcut.register('F5', () => {
    browser.webContents.send(IpcEvent.Config.SendInitialConfig, AppStore.getState().fileData)
  })

  /**
   *  Application config flags
   */
  for (const flag of Object.keys(
    FlagConfigManager.getLastSchema().shape
  ) as (keyof IFlagConfig)[]) {
    const ipcFlag = IpcEvent.Config.Flags(flag)
    ipcMain.handle(ipcFlag, async () => {
      await AppStore.getState().toggleFlag(flag)
      browser.webContents.send(ipcFlag, AppStore.getState().fileData.flags[flag])
    })
  }

  /**
   *  Main application sequence
   */
  const sequence = new Sequence(browser)
  const seqInit = async (_: any, ...values: any[]) => {
    await sequence.initialize(values[0])
  }

  ipcMain.handle(IpcEvent.Sequence.Started, seqInit)

  ipcMain.on(IpcEvent.CloseApp, () => {
    sequence.CTX?.close()
    sequence.BRO?.close()
    ipcMain.removeListener(IpcEvent.Sequence.Started, seqInit)

    browser.close()
  })
}
