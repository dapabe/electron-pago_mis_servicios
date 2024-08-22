import { IpcEvent } from '#shared/constants/ipc-events'
import {
  IIpcIntegrityInitialize,
  IpcIntegrityLoginSchema
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponse, IpcResponseType } from '#shared/utilities/IpcResponse'
import { ipcRenderer } from 'electron'
import { StatusCodes } from 'http-status-codes'

// Custom APIs for renderer
export const preloadApi = {
  integrityInitialize: async (): Promise<IpcResponseType<IIpcIntegrityInitialize>> => {
    return await ipcRenderer.invoke(IpcEvent.Integrity.Initialize)
  },
  integrityLogin: async (data: unknown) => {
    const validated = IpcIntegrityLoginSchema.safeParse(data)
    if (!validated.success) {
      return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error.format())
    }
    //todo check pass ok

    await ipcRenderer.invoke(IpcEvent.Integrity.Login, validated.data)

    return new IpcResponse(StatusCodes.OK, null)
  },
  getTranslation: async (): Promise<IpcResponseType<Record<string, string>>> => {
    return await ipcRenderer.invoke(IpcEvent.Language.Messages)
  }
} as const
