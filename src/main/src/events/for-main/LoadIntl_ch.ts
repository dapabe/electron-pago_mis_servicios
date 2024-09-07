import { IpcEvent } from '#shared/constants/ipc-events'
import { loadI18n } from '../../utilities/loadi18n'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'

export default class LoadIntlChannel implements AbstractIpcChannel {
  channelID = IpcEvent.Language.Messages

  async handleAsync(_, locale: string) {
    return await loadI18n(locale)
  }
}
