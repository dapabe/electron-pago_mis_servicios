import { IpcEvent } from '#shared/constants/ipc-events'
import { LocalDatabase } from '../../database/LocalDatabase'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'

const DatabasePasswordResetChannel: AbstractIpcChannel = {
  channelID: IpcEvent.Db.Password.Reset,

  async handleAsync(_, newPassword: string) {
    return await LocalDatabase.changePassword(newPassword)
  }
}

export default DatabasePasswordResetChannel
