import { BrowserWindow, ipcMain } from 'electron'

export function loadBrowserEvents(browser: BrowserWindow) {
  ipcMain.on('toggle-maximize', () => {
    if (browser.isMinimized()) browser.maximize()
    else browser.minimize()
  })
}
