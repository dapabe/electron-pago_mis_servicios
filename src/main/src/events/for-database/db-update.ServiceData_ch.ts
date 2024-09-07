import { IpcEvent } from '#shared/constants/ipc-events'
import { IServiceDataDTO } from '#shared/schemas/dtos/ServiceData.dto.schema'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { LocalDatabase } from '../../database/LocalDatabase'
import { ServiceDataModel } from '../../database/models/ServiceDataModel'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'
import { IpcResponse } from '#shared/utilities/IpcResponse'

export default class DbUpdateServiceDataChannel implements AbstractIpcChannel {
  channelID = IpcEvent.Db.CRUD.Update.ServiceData

  async handleAsync(_, request: IServiceDataDTO<'UpdateSchema'>) {
    return await LocalDatabase.withTransaction(async (t) => {
      await ServiceDataModel.update(request, { where: { id: request.id }, transaction: t })
      return new IpcResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK)).toResult()
    })
  }
}
