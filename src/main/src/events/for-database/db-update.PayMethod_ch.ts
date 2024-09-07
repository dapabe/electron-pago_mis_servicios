import { IpcEvent } from '#shared/constants/ipc-events'
import { IPaymentMethodDTO } from '#shared/schemas/dtos/PaymentMethod.dto.schema'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { LocalDatabase } from '../../database/LocalDatabase'
import { PaymentMethodModel } from '../../database/models/PaymentMethodModel'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'

export default class DbUpdatePayMethodChannel implements AbstractIpcChannel {
  channelID = IpcEvent.Db.CRUD.Update.PayMethod
  async handleAsync(_, request: IPaymentMethodDTO<'UpdateSchema'>) {
    return await LocalDatabase.withTransaction(async (t) => {
      await PaymentMethodModel.update(request, { where: { id: request.id }, transaction: t })
      return new IpcResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK)).toResult()
    })
  }
}
