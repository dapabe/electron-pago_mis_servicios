import { IpcEvent } from '#shared/constants/ipc-events'
import {
  IIpcIntegrityLogin,
  IIpcIntegrityRegister
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { BrowserWindow, dialog, ipcMain } from 'electron'
import { LocalDatabase } from '../database/LocalDatabase'
import { AppStore } from '../stores/app-store'

export async function ipcsForDatabase(mainWin: BrowserWindow) {
  ipcMain.handle(IpcEvent.Db.Register, async (_, data: IIpcIntegrityRegister) => {
    await new LocalDatabase(AppStore.getState().settingsData.databaseFilePath).initialize()
  })

  ipcMain.handle(IpcEvent.Db.Login, async (_, data: IIpcIntegrityLogin) => {
    // evt
    // _.sender.
  })

  ipcMain.handle(IpcEvent.Db.SelectFile, async (evt, defaultPath: string) => {
    const dialogResult = await dialog.showOpenDialog(BrowserWindow.fromWebContents(evt.sender)!, {
      defaultPath,
      filters: [{ name: '', extensions: ['sqlite'] }],
      properties: ['showHiddenFiles', 'openFile']
    })

    if (dialogResult.canceled) return undefined
    await AppStore.getState().changeSettings((settings) => {
      settings.databaseFilePath = dialogResult.filePaths[0]
    })
    return dialogResult.filePaths[0]
  })
}
