import { IpcResponse } from '#shared/utilities/IpcResponse'
import { StatusCodes } from 'http-status-codes'
import { LocalDatabase } from '../../../database/LocalDatabase'
import { PaymentMethodModel } from '../../../database/models/PaymentMethodModel'
import { AbstractIpcChannel } from '../../../utilities/types/abstract-ipc-channel'
import { IpcEvent } from '#shared/constants/ipc-events'

const DbReadPayMethodChannel: AbstractIpcChannel = {
  channelID: IpcEvent.Db.CRUD.Read.PayMethod,

  async handleAsync() {
    return await LocalDatabase.withTransaction(async (t) => {
      const res = await PaymentMethodModel.findAll({ transaction: t })
      const mapped = res.map((item) => item.toJSON())
      return new IpcResponse(StatusCodes.OK, mapped).toResult()
    })
  }
}

export default DbReadPayMethodChannel
