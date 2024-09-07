import { IpcEvent } from '#shared/constants/ipc-events'
import { ServiceDataDTO } from '#shared/schemas/dtos/ServiceData.dto.schema'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { StatusCodes } from 'http-status-codes'
import { LocalDatabase } from '../../database/LocalDatabase'
import { ServiceDataModel } from '../../database/models/ServiceDataModel'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'

export default class DbReadServiceDataChannel implements AbstractIpcChannel {
  channelID = IpcEvent.Db.CRUD.Read.ServiceData
  async handleAsync() {
    return await LocalDatabase.withTransaction(async (t) => {
      const res = await ServiceDataModel.findAll({ transaction: t })
      const mapped = ServiceDataDTO.ReadSchema.array().safeParse(res.map((item) => item.toJSON()))
      if (!mapped.success) {
        return new IpcResponse(StatusCodes.BAD_REQUEST, mapped.error.issues[0].message).toResult()
      }
      return new IpcResponse(StatusCodes.OK, mapped.data).toResult()
    })
  }
}
