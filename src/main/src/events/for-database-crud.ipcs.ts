import { IpcEvent } from '#shared/constants/ipc-events'
import { ipcMain } from 'electron'
import { LocalDatabase } from '../database/LocalDatabase'
import { IServiceDataDTO, ServiceDataDTO } from '#shared/schemas/dtos/ServiceData.dto.schema'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { IPaymentMethodDTO } from '#shared/schemas/dtos/PaymentMethod.dto.schema'
import { ServiceDataModel } from '../database/models/ServiceDataModel'
import { PaymentMethodModel } from '../database/models/PaymentMethodModel'

export async function ipcsForDatabaseCrud() {
  /**
   *  CRUD events for ServiceDataModel
   */

  ipcMain.handle(
    IpcEvent.Db.CRUD.Create.ServiceData,
    async (_, data: IServiceDataDTO<'CreateSchema'>) => {
      return await LocalDatabase.withTransaction(async (t) => {
        await ServiceDataModel.create(data, { transaction: t })
        return new IpcResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED)).toResult()
      })
    }
  )

  ipcMain.handle(IpcEvent.Db.CRUD.Read.ServiceData, async () => {
    return await LocalDatabase.withTransaction(async (t) => {
      const res = await ServiceDataModel.findAll({ transaction: t })
      const mapped = ServiceDataDTO.ReadSchema.array().safeParse(res.map((item) => item.toJSON()))
      if (!mapped.success)
        return new IpcResponse(StatusCodes.BAD_REQUEST, mapped.error.issues[0].message).toResult()
      return new IpcResponse(StatusCodes.OK, mapped.data).toResult()
    })
  })

  ipcMain.handle(
    IpcEvent.Db.CRUD.Update.ServiceData,
    async (_, data: IServiceDataDTO<'UpdateSchema'>) => {
      return await LocalDatabase.withTransaction(async (t) => {
        await ServiceDataModel.update(data, { where: { id: data.id }, transaction: t })
        return new IpcResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK)).toResult()
      })
    }
  )

  ipcMain.handle(IpcEvent.Db.CRUD.Delete.ServiceData, async (_, ...ids: number[]) => {
    return await LocalDatabase.withTransaction(async (t) => {
      await ServiceDataModel.destroy({ where: ids.map((id) => ({ id })), transaction: t })
      return new IpcResponse(
        StatusCodes.NO_CONTENT,
        getReasonPhrase(StatusCodes.NO_CONTENT)
      ).toResult()
    })
  })

  /**
   *  CRUD events for PaymentMethodModel
   */

  ipcMain.handle(
    IpcEvent.Db.CRUD.Create.PayMethod,
    async (_, data: IPaymentMethodDTO<'CreateSchema'>) => {
      return await LocalDatabase.withTransaction(async (t) => {
        await PaymentMethodModel.create(data, { transaction: t })
        return new IpcResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED)).toResult()
      })
    }
  )

  ipcMain.handle(IpcEvent.Db.CRUD.Read.PayMethod, async () => {
    return await LocalDatabase.withTransaction(async (t) => {
      const res = await PaymentMethodModel.findAll({ transaction: t })
      const mapped = ServiceDataDTO.ReadSchema.array().safeParse(res.map((item) => item.toJSON()))
      if (!mapped.success)
        return new IpcResponse(StatusCodes.BAD_REQUEST, mapped.error.issues[0].message).toResult()
      return new IpcResponse(StatusCodes.OK, mapped.data).toResult()
    })
  })

  ipcMain.handle(
    IpcEvent.Db.CRUD.Update.PayMethod,
    async (_, data: IPaymentMethodDTO<'UpdateSchema'>) => {
      return await LocalDatabase.withTransaction(async (t) => {
        await PaymentMethodModel.update(data, { where: { id: data.id }, transaction: t })
        return new IpcResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK)).toResult()
      })
    }
  )

  ipcMain.handle(IpcEvent.Db.CRUD.Delete.PayMethod, async (_, ...ids: number[]) => {
    return await LocalDatabase.withTransaction(async (t) => {
      await PaymentMethodModel.destroy({ where: ids.map((id) => ({ id })), transaction: t })
      return new IpcResponse(
        StatusCodes.NO_CONTENT,
        getReasonPhrase(StatusCodes.NO_CONTENT)
      ).toResult()
    })
  })
}
