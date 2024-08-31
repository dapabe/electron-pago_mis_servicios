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
import { ServiceDataModel } from '../database/models/ServiceDataModel'
import { IServiceDataDTO } from '#shared/schemas/dtos/ServiceData.dto.schema'
import { IPaymentMethodDTO } from '#shared/schemas/dtos/PaymentMethod.dto.schema'
import { PaymentMethodModel } from '../database/models/PaymentMethodModel'

export async function ipcsForDatabase(mainWin: BrowserWindow) {
  ipcMain.handle(IpcEvent.Db.Register, async (_, data: IIpcIntegrityRegister) => {
    const local = new LocalDatabase(
      AppStore.getState().settingsData.databaseFilePath!,
      data.password
    )

    await local.initialize()

    return new IpcResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED)).toResult()
  })

  ipcMain.handle(IpcEvent.Db.Login, async (_, data: IIpcIntegrityLogin) => {
    const local = new LocalDatabase(
      AppStore.getState().settingsData.databaseFilePath!,
      data.password
    )
    await local.initialize()

    return new IpcResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK)).toResult()
  })

  ipcMain.handle(IpcEvent.Db.Password.Reset, async () => {})

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

  /**
   *  CRUD EVENTS
   */

  ipcMain.handle(IpcEvent.Db.Create.ServiceData, async (_, data: IServiceDataDTO<'ReadSchema'>) => {
    return await LocalDatabase.withTransaction(async (t) => {
      await ServiceDataModel.create(data, { transaction: t })
      return new IpcResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED)).toResult()
    })
  })

  ipcMain.handle(IpcEvent.Db.Create.PayMethod, async (_, data: IPaymentMethodDTO<'ReadSchema'>) => {
    return await LocalDatabase.withTransaction(async (t) => {
      await PaymentMethodModel.create(data, { transaction: t })
      return new IpcResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED)).toResult()
    })
  })
}
