import { IpcEvent } from '#shared/constants/ipc-events'
import { app, BrowserWindow, ipcMain } from 'electron'
import { Sequence } from './sequence/Sequence'

export function loadBrowserEvents(browser: BrowserWindow) {
  ipcMain.on(IpcEvent.ToggleMaximize, () => {
    if (browser.isMinimized()) browser.maximize()
    else browser.minimize()
  })

  browser.webContents.once('did-finish-load', () => {
    browser.webContents.send(IpcEvent.AppVersion, app.getVersion())
  })

  const sequence = new Sequence(browser)
  ipcMain.on(IpcEvent.StartSequence, async () => {
    await sequence.initialize()
  })

  ipcMain.on(IpcEvent.CloseApp, () => {
    sequence.CTX?.close()
    sequence.BRO?.close()
    browser.close()
  })
}
