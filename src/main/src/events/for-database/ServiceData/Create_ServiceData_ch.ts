import { IpcEvent } from '#shared/constants/ipc-events'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { LocalDatabase } from '../../../database/LocalDatabase'
import { ServiceDataModel } from '../../../database/models/ServiceDataModel'
import { AbstractIpcChannel } from '../../../utilities/types/abstract-ipc-channel'
import { IServiceDataDTO } from '#shared/schemas/dtos/ServiceData.dto.schema'

const DbCreateServiceDataChannel: AbstractIpcChannel = {
  channelID: IpcEvent.Db.CRUD.Create.ServiceData,
  async handleAsync(_, request: IServiceDataDTO<'CreateSchema'>) {
    return await LocalDatabase.withTransaction(async (t) => {
      await ServiceDataModel.create(request, { transaction: t })
      return new IpcResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED)).toResult()
    })
  }
}

export default DbCreateServiceDataChannel
