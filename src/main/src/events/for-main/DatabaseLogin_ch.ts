import { IpcEvent } from '#shared/constants/ipc-events'
import { IIpcIntegrityLogin } from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { LocalDatabase } from '../../database/LocalDatabase'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'
import { AppStore } from '../../stores/app-store'

const DatabaseLoginChannel: AbstractIpcChannel = {
  channelID: IpcEvent.Db.Login,

  async handleAsync(_, request: IIpcIntegrityLogin) {
    await LocalDatabase.createInstance(
      AppStore.getState().settingsData.databaseFilePath!,
      request.password
    )

    return new IpcResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK)).toResult()
  }
}

export default DatabaseLoginChannel
