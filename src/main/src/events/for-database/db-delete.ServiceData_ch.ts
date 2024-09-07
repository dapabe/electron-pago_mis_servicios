import { IpcEvent } from '#shared/constants/ipc-events'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { LocalDatabase } from '../../database/LocalDatabase'
import { ServiceDataModel } from '../../database/models/ServiceDataModel'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'

export default class DbDeleteServiceDataChannel implements AbstractIpcChannel {
  channelID = IpcEvent.Db.CRUD.Delete.ServiceData

  async handleAsync(_, ...ids: number[]) {
    return await LocalDatabase.withTransaction(async (t) => {
      await ServiceDataModel.destroy({ where: ids.map((id) => ({ id })), transaction: t })
      return new IpcResponse(
        StatusCodes.NO_CONTENT,
        getReasonPhrase(StatusCodes.NO_CONTENT)
      ).toResult()
    })
  }
}
