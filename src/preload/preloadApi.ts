import { IpcEvent } from '#shared/constants/ipc-events'
import { IAppIntl } from '#shared/schemas/intl.schema'
import {
  IIpcIntegrityInitialize,
  IIpcIntegrityLogin,
  IIpcIntegrityRegister,
  IpcIntegrityLoginSchema,
  IpcIntegrityRegisterSchema
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { AppSettingsManager } from '#shared/schemas/settings.schema'
import { IpcResponse, IpcResponseResult } from '#shared/utilities/IpcResponse'
import { ipcRenderer } from 'electron'
import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod'

// Custom APIs for renderer
export const preloadApi = {
  integrityInitialize: async (): Promise<IpcResponseResult<IIpcIntegrityInitialize>> => {
    return await ipcRenderer.invoke(IpcEvent.Integrity.Initialize)
  },
  appRegister: async (
    data: unknown
  ): Promise<IpcResponseResult<IIpcIntegrityRegister | ZodError<IIpcIntegrityRegister>>> => {
    const validated = IpcIntegrityRegisterSchema.safeParse(data)
    if (!validated.success) {
      return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error).toResult()
    }
    return await ipcRenderer.invoke(IpcEvent.Db.Register, validated.data)
  },
  appLogin: async (
    data: unknown
  ): Promise<IpcResponseResult<string | ZodError<IIpcIntegrityLogin>>> => {
    const validated = IpcIntegrityLoginSchema.safeParse(data)
    if (!validated.success) {
      return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error).toResult()
    }
    return await ipcRenderer.invoke(IpcEvent.Db.Login, validated.data)
  },
  getTranslation: async (): Promise<IpcResponseResult<IAppIntl | ZodError<IAppIntl>>> => {
    return await ipcRenderer.invoke(IpcEvent.Language.Messages)
  },
  selectDatabase: async (
    defaultPath: unknown
  ): Promise<IpcResponseResult<string | ZodError<string>>> => {
    const validated = AppSettingsManager.getLastSchema()
      .shape.databaseFilePath.removeDefault()
      .safeParse(defaultPath ?? '')
    if (!validated.success) {
      return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error)
    }
    return await ipcRenderer.invoke(IpcEvent.Db.SelectFile, defaultPath)
  }
} as const
