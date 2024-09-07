import { IpcEvent } from '#shared/constants/ipc-events'
import { LocalDatabase } from '../../database/LocalDatabase'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'

export default class AuthenticatedChannel implements AbstractIpcChannel {
  channelID = IpcEvent.Db.isAuthenticated

  async handleAsync() {
    return Boolean(LocalDatabase.sqlite)
  }
}
