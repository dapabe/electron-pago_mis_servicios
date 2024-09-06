import { IpcEvent } from '#shared/constants/ipc-events'
import { BrowserWindow, ipcMain } from 'electron'

/**
 *  Ipcs to replace default electron/chromiun behavior
 */
export async function ipcsOnDefault(mainWin: BrowserWindow) {
  /**
   *  Maximize/Minimize window
   */
  ipcMain.on(IpcEvent.App.ToggleMaximize, (evt) => {
    const win = BrowserWindow.fromWebContents(evt.sender)
    if (!win) return
    if (win.isMinimized()) win.maximize()
    else win.minimize()
  })

  /**
   *  Close app
   */
  ipcMain.once(IpcEvent.App.CloseApp, (evt) => {
    const win = BrowserWindow.fromWebContents(evt.sender)
    if (!win) return
    win.close()
  })

  mainWin.webContents.on('did-finish-load', async () => {
    /**
     *  Dark mode; can also be done in the renderer
     */
    await mainWin.webContents.executeJavaScript(`
      window.document.documentElement.classList.add('dark')
    `)

    /**
     *  Prevent Mouse Navigation
     */
    await mainWin.webContents.executeJavaScript(`
      document.addEventListener('mouseup', (event) => {
        if ([3, 4].includes(event.button)) {
          event.preventDefault()
          event.stopPropagation()
        }
      })
    `)
  })
}
