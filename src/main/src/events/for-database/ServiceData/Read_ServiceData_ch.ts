import { IpcEvent } from '#shared/constants/ipc-events'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { StatusCodes } from 'http-status-codes'
import { LocalDatabase } from '../../../database/LocalDatabase'
import { ServiceDataModel } from '../../../database/models/ServiceDataModel'
import { AbstractIpcChannel } from '../../../utilities/types/abstract-ipc-channel'

const DbReadServiceDataChannel: AbstractIpcChannel = {
  channelID: IpcEvent.Db.CRUD.Read.ServiceData,
  async handleAsync() {
    return await LocalDatabase.withTransaction(async (t) => {
      const res = await ServiceDataModel.findAll({ transaction: t })
      const mapped = res.map((item) => item.toJSON())
      return new IpcResponse(StatusCodes.OK, mapped).toResult()
    })
  }
}

export default DbReadServiceDataChannel
