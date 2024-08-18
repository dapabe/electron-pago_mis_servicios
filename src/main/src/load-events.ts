import { IpcEvent } from '#shared/constants/ipc-events'
import { app, BrowserWindow, ipcMain } from 'electron'
import { Sequence } from './sequence/Sequence'
import { AppStore } from './app-store'
import { FlagConfigManager, IFlagConfig } from '#shared/schemas/flags.schema'

const appState = AppStore.getState()

export function loadBrowserEvents(browser: BrowserWindow) {
  ipcMain.on(IpcEvent.ToggleMaximize, () => {
    if (browser.isMinimized()) browser.maximize()
    else browser.minimize()
  })

  browser.webContents.once('did-finish-load', () => {
    browser.webContents.send(IpcEvent.AppVersion, app.getVersion())
    browser.webContents.send(IpcEvent.Config.SendInitialConfig, appState.fileData.flags)
  })

  for (const flag of Object.keys(
    FlagConfigManager.getLastSchema().shape
  ) as (keyof IFlagConfig)[]) {
    const ipcFlag = IpcEvent.Config.Flags(flag)
    ipcMain.on(ipcFlag, () => {
      appState.toggleFlag(flag)
      browser.webContents.send(ipcFlag, appState.fileData.flags)
    })
  }

  const sequence = new Sequence(browser)
  ipcMain.on(IpcEvent.Sequence.Started, sequence.initialize)

  ipcMain.on(IpcEvent.CloseApp, () => {
    sequence.CTX?.close()
    sequence.BRO?.close()
    ipcMain.removeListener(IpcEvent.Sequence.Started, sequence.initialize)

    browser.close()
  })
}
