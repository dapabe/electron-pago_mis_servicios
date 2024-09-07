import { IpcEvent } from '#shared/constants/ipc-events'
import { AbstractIpcChannel } from '#main/src/utilities/types/abstract-ipc-channel'
import { LocalDatabase } from '../../database/LocalDatabase'

const AuthenticatedChannel: AbstractIpcChannel = {
  channelID: IpcEvent.Db.isAuthenticated,

  async handleAsync() {
    return Boolean(LocalDatabase.sqlite)
  }
}

export default AuthenticatedChannel
