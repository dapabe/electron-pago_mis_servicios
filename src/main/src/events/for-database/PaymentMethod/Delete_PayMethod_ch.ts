import { IpcEvent } from '#shared/constants/ipc-events'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { LocalDatabase } from '../../../database/LocalDatabase'
import { PaymentMethodModel } from '../../../database/models/PaymentMethodModel'
import { AbstractIpcChannel } from '../../../utilities/types/abstract-ipc-channel'

const DbDeletePayMethodChannel: AbstractIpcChannel = {
  channelID: IpcEvent.Db.CRUD.Delete.PayMethod,

  async handleAsync(_, ...ids: number[]) {
    return await LocalDatabase.withTransaction(async (t) => {
      await PaymentMethodModel.destroy({ where: ids.map((id) => ({ id })), transaction: t })
      return new IpcResponse(
        StatusCodes.NO_CONTENT,
        getReasonPhrase(StatusCodes.NO_CONTENT)
      ).toResult()
    })
  }
}

export default DbDeletePayMethodChannel
