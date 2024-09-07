import { IpcEvent } from '#shared/constants/ipc-events'
import { LocalDatabase } from '../../database/LocalDatabase'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'

export default class DatabasePasswordResetChannel implements AbstractIpcChannel {
  channelID = IpcEvent.Db.Password.Reset

  async handleAsync(_, newPassword: string) {
    return await LocalDatabase.changePassword(newPassword)
  }
}
