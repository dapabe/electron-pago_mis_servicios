import { IpcEvent } from '#shared/constants/ipc-events'
import { IIpcIntegrityRegister } from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { LocalDatabase } from '../../database/LocalDatabase'
import { AppStore } from '../../stores/app-store'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'

const DatabaseRegisterChannel: AbstractIpcChannel = {
  channelID: IpcEvent.Db.Register,
  async handleAsync(_, request: IIpcIntegrityRegister) {
    await LocalDatabase.createInstance(
      AppStore.getState().settingsData.databaseFilePath!,
      request.password
    )
    return new IpcResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED)).toResult()
  }
}

export default DatabaseRegisterChannel
