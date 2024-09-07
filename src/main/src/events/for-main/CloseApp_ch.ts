import { IpcEvent } from '#shared/constants/ipc-events'
import { BrowserWindow, IpcMainEvent } from 'electron'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'

const CloseAppChannel: AbstractIpcChannel = {
  channelID: IpcEvent.App.CloseApp,
  handleSyncOnce(event: IpcMainEvent) {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    win.close()
  }
}

export default CloseAppChannel
