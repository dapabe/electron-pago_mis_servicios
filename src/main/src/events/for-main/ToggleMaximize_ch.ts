import { IpcEvent } from '#shared/constants/ipc-events'
import { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'

export default class ToggleMaximizeChannel implements AbstractIpcChannel {
  channelID = IpcEvent.App.ToggleMaximize

  handleSync(event: IpcMainInvokeEvent) {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    if (win.isMinimized()) win.maximize()
    else win.minimize()
  }
}
