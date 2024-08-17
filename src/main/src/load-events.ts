import { IpcEvent } from '#shared/ipc-events'
import { app, BrowserWindow, ipcMain } from 'electron'
import { DataStore } from './data-store'

export function loadBrowserEvents(browser: BrowserWindow) {
  ipcMain.on(IpcEvent.ToggleMaximize, () => {
    if (browser.isMinimized()) browser.maximize()
    else browser.minimize()
  })

  browser.webContents.once('did-finish-load', () => {
    browser.webContents.send(IpcEvent.AppVersion, app.getVersion())
  })

  ipcMain.on(IpcEvent.CloseApp, () => {
    browser.close()
  })

  ipcMain.on(IpcEvent.StartSequence, async () => {
    console.log(DataStore().dataFilePath)
  })
}
