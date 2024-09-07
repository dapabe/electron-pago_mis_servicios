import { IpcMainEvent, IpcMainInvokeEvent } from 'electron'

export type IpcRequest = {
  responseChannel: string
  params?: string[]
}

export type AbstractIpcChannel<R = unknown> = {
  channelID: string
  handleAsync?(event: IpcMainInvokeEvent, ...requests: any[]): Promise<R>
  handleSync?(event: IpcMainEvent, request: IpcRequest): void
  handleSyncOnce?(event: IpcMainEvent, request: IpcRequest): void
}
