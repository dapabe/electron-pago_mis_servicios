import { IpcEvent } from '#shared/constants/ipc-events'
import {
  IIpcIntegrityLogin,
  IIpcIntegrityRegister
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { BrowserWindow, dialog, ipcMain } from 'electron'

export async function ipcsForDatabase(mainWin: BrowserWindow) {
  ipcMain.handle(IpcEvent.Db.Register, (_, data: IIpcIntegrityRegister) => {
    // evt
    // _.sender.
    console.log(data)
  })

  ipcMain.handle(IpcEvent.Db.Login, (_, data: IIpcIntegrityLogin) => {
    // evt
    // _.sender.
    console.log(data)
  })

  ipcMain.handle(IpcEvent.Db.SelectFile, async (evt, defaultPath: string) => {
    const dialogResult = await dialog.showOpenDialog(BrowserWindow.fromWebContents(evt.sender)!, {
      defaultPath,
      filters: [{ name: '', extensions: ['sqlite'] }],
      properties: ['showHiddenFiles', 'openFile']
    })

    if (dialogResult.canceled) return undefined
    return dialogResult.filePaths[0]
  })

  ipcMain.handle(IpcEvent.Db.CreateDb, async () => {})
}
