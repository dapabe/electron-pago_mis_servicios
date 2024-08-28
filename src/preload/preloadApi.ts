import { IpcEvent } from '#shared/constants/ipc-events'
import {
  IIpcIntegrityInitialize,
  IpcIntegrityLoginSchema,
  IpcIntegrityRegisterSchema
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponse, IpcResponseResult } from '#shared/utilities/IpcResponse'
import { ipcRenderer } from 'electron'
import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod'

// Custom APIs for renderer
export const preloadApi = {
  integrityInitialize: async (): Promise<IpcResponseResult<IIpcIntegrityInitialize>> => {
    return await ipcRenderer.invoke(IpcEvent.Integrity.Initialize)
  },
  appRegister: async (data: unknown) => {
    const validated = IpcIntegrityRegisterSchema.safeParse(data)
    if (!validated.success) {
      return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error).toResult()
    }
    return (await ipcRenderer.invoke(IpcEvent.Db.Register, validated.data)) as IpcResponseResult<
      typeof validated.data
    >
  },
  appLogin: async (data: unknown) => {
    const validated = IpcIntegrityLoginSchema.safeParse(data)
    if (!validated.success) {
      return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error).toResult()
    }
    return new IpcResponse(StatusCodes.OK, null).toResult()
  },
  getTranslation: async (): Promise<
    IpcResponse<IpcResponseResult<Record<string, string> | ZodError>>
  > => {
    return await ipcRenderer.invoke(IpcEvent.Language.Messages)
  },
  selectDatabase: async (defaultPath: string): Promise<string | undefined> => {
    return await ipcRenderer.invoke(IpcEvent.Db.SelectFile, defaultPath)
  }
} as const
