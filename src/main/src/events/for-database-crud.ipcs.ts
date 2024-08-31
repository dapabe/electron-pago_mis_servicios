import { IpcEvent } from '#shared/constants/ipc-events'
import { ipcMain } from 'electron'
import { LocalDatabase } from '../database/LocalDatabase'
import { IServiceDataDTO } from '#shared/schemas/dtos/ServiceData.dto.schema'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { IPaymentMethodDTO } from '#shared/schemas/dtos/PaymentMethod.dto.schema'
import { ServiceDataModel } from '../database/models/ServiceDataModel'
import { PaymentMethodModel } from '../database/models/PaymentMethodModel'

export async function ipcsForDatabaseCrud() {
  /**
   *  CRUD events for ServiceDataModel
   */

  ipcMain.handle(IpcEvent.Db.Create.ServiceData, async (_, data: IServiceDataDTO<'ReadSchema'>) => {
    return await LocalDatabase.withTransaction(async (t) => {
      await ServiceDataModel.create(data, { transaction: t })
      return new IpcResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED)).toResult()
    })
  })

  /**
   *  CRUD events for PaymentMethodModel
   */

  ipcMain.handle(
    IpcEvent.Db.Create.PayMethod,
    async (_, data: IPaymentMethodDTO<'CreateSchema'>) => {
      return await LocalDatabase.withTransaction(async (t) => {
        await PaymentMethodModel.create(data, { transaction: t })
        return new IpcResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED)).toResult()
      })
    }
  )
}
