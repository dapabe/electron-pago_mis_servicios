import { IpcEvent } from '#shared/constants/ipc-events'
import { BrowserWindow, dialog, IpcMainInvokeEvent } from 'electron'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'
import { AppStore } from '../../stores/app-store'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { StatusCodes } from 'http-status-codes'

export default class DatabaseSelectChannel implements AbstractIpcChannel {
  channelID = IpcEvent.Db.SelectFile

  async handleAsync(event: IpcMainInvokeEvent, defaultPath: string) {
    const dialogResult = await dialog.showOpenDialog(BrowserWindow.fromWebContents(event.sender)!, {
      defaultPath,
      filters: [{ name: '', extensions: ['sqlite'] }],
      properties: ['showHiddenFiles', 'openFile']
    })

    if (dialogResult.canceled) return new IpcResponse(StatusCodes.NOT_FOUND, null).toResult()
    await AppStore.getState().changeSettings((settings) => {
      settings.databaseFilePath = dialogResult.filePaths[0]
    })
    return new IpcResponse(StatusCodes.OK, dialogResult.filePaths[0]).toResult()
  }
}
