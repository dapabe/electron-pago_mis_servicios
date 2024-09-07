import { IpcEvent } from '#shared/constants/ipc-events'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { StatusCodes } from 'http-status-codes'
import { app } from 'electron'
import { AbstractIpcChannel } from '#main/src/utilities/types/abstract-ipc-channel'

const BundleInfoChannel: AbstractIpcChannel = {
  channelID: IpcEvent.App.Info,

  async handleAsync() {
    return new IpcResponse(StatusCodes.OK, {
      env: process.env.NODE_ENV,
      version: app.getVersion()
    }).toResult()
  }
}

export default BundleInfoChannel
