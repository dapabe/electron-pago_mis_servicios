import { AppStore } from '../../stores/app-store'
import { IpcEvent } from '#shared/constants/ipc-events'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { StatusCodes } from 'http-status-codes'
import { LocalDatabase } from '../../database/LocalDatabase'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'

const DatabasePasswordResetChannel: AbstractIpcChannel = {
  channelID: IpcEvent.Db.Password.Reset,

  async handleAsync(_, newPassword: string) {
    const masterKey = await LocalDatabase.getMasterKey()
    if (!masterKey)
      return new IpcResponse(StatusCodes.INTERNAL_SERVER_ERROR, 'MASTER KEY NOT FOUND').toResult()

    await LocalDatabase.createInstance(
      AppStore.getState().settingsData.databaseFilePath!,
      masterKey
    )

    return await LocalDatabase.changePassword(newPassword)
  }
}

export default DatabasePasswordResetChannel
