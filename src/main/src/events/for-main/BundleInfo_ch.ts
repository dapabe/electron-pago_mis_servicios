import { IpcEvent } from '#shared/constants/ipc-events'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { StatusCodes } from 'http-status-codes'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'
import { app } from 'electron'

export default class BundleInfoChannel implements AbstractIpcChannel {
  channelID = IpcEvent.App.Info

  async handleAsync() {
    return new IpcResponse(StatusCodes.OK, {
      env: process.env.NODE_ENV,
      version: app.getVersion()
    }).toResult()
  }
}
