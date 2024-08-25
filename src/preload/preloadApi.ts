import { IpcEvent } from '#shared/constants/ipc-events'
import {
  IIpcIntegrityInitialize,
  IpcIntegrityLoginSchema,
  IpcIntegrityRegisterSchema
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { ipcRenderer } from 'electron'
import { StatusCodes } from 'http-status-codes'

// Custom APIs for renderer
export const preloadApi = {
  integrityInitialize: async (): Promise<IpcResponse<IIpcIntegrityInitialize>> => {
    return await ipcRenderer.invoke(IpcEvent.Integrity.Initialize)
  },
  appRegister: async (data: unknown, skipServer: boolean) => {
    const validated = IpcIntegrityRegisterSchema.safeParse(data)
    if (!validated.success) {
      return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error.format())
    }
    //todo check pass ok

    await ipcRenderer.invoke(IpcEvent.Db.Register, validated.data)

    return new IpcResponse(StatusCodes.OK, null)
  },
  appLogin: async (data: unknown, skipServer: boolean) => {
    const validated = IpcIntegrityLoginSchema.safeParse(data)
    if (!validated.success) {
      return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error.format())
    }
  },
  getTranslation: async (): Promise<IpcResponse<Record<string, string>>> => {
    return await ipcRenderer.invoke(IpcEvent.Language.Messages)
  },
  selectDatabase: async (defaultPath: string): Promise<string | undefined> => {
    return await ipcRenderer.invoke(IpcEvent.Db.SelectFile, defaultPath)
  }
} as const
