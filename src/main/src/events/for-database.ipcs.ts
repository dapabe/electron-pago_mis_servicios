import { IpcEvent } from '#shared/constants/ipc-events'
import {
  IIpcIntegrityLogin,
  IIpcIntegrityRegister
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { BrowserWindow, dialog, ipcMain } from 'electron'
import { LocalDatabase } from '../database/LocalDatabase'
import { AppStore } from '../stores/app-store'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

export async function ipcsForDatabase() {
  ipcMain.handle(IpcEvent.Db.Register, async (_, data: IIpcIntegrityRegister) => {
    await LocalDatabase.createInstance(
      AppStore.getState().settingsData.databaseFilePath!,
      data.password
    )

    return new IpcResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED)).toResult()
  })

  ipcMain.handle(IpcEvent.Db.Login, async (_, data: IIpcIntegrityLogin) => {
    await LocalDatabase.createInstance(
      AppStore.getState().settingsData.databaseFilePath!,
      data.password
    )

    return new IpcResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK)).toResult()
  })

  ipcMain.handle(IpcEvent.Db.Password.Reset, async (_, newPassword: string) => {
    return await LocalDatabase.changePassword(newPassword)
  })

  ipcMain.handle(IpcEvent.Db.SelectFile, async (evt, defaultPath: string) => {
    const dialogResult = await dialog.showOpenDialog(BrowserWindow.fromWebContents(evt.sender)!, {
      defaultPath,
      filters: [{ name: '', extensions: ['sqlite'] }],
      properties: ['showHiddenFiles', 'openFile']
    })

    if (dialogResult.canceled) return new IpcResponse(StatusCodes.NOT_FOUND, null).toResult()
    await AppStore.getState().changeSettings((settings) => {
      settings.databaseFilePath = dialogResult.filePaths[0]
    })
    return new IpcResponse(StatusCodes.OK, dialogResult.filePaths[0]).toResult()
  })

  ipcMain.handle(IpcEvent.Db.isAuthenticated, () => {
    return Boolean(LocalDatabase.sqlite)
  })
}
