import { IpcEvent } from '#shared/constants/ipc-events'
import { IPaymentMethodDTO, PaymentMethodDTO } from '#shared/schemas/dtos/PaymentMethod.dto.schema'
import { IServiceDataDTO, ServiceDataDTO } from '#shared/schemas/dtos/ServiceData.dto.schema'
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
  },
  CRUD: {
    ServiceData: {
      create: async (
        data: unknown
      ): Promise<IpcResponseResult<string | ZodError<IServiceDataDTO<'CreateSchema'>>>> => {
        const validated = ServiceDataDTO.CreateSchema.safeParse(data)
        if (!validated.success) {
          return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error).toResult()
        }
        return await ipcRenderer.invoke(IpcEvent.Db.CRUD.Create.ServiceData, validated.data)
      },
      read: async (): Promise<
        IpcResponseResult<IServiceDataDTO<'ReadSchema'>[] | ZodError<IServiceDataDTO<'ReadSchema'>>>
      > => {
        return await ipcRenderer.invoke(IpcEvent.Db.CRUD.Read.ServiceData)
      },
      update: async (
        data: unknown
      ): Promise<IpcResponseResult<string | ZodError<IServiceDataDTO<'UpdateSchema'>>>> => {
        const validated = ServiceDataDTO.UpdateSchema.safeParse(data)
        if (!validated.success) {
          return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error).toResult()
        }
        return await ipcRenderer.invoke(IpcEvent.Db.CRUD.Update.ServiceData, validated.data)
      },
      delete: async (...ids: number[]): Promise<IpcResponseResult<string | ZodError<number[]>>> => {
        const validated = ServiceDataDTO.ReadSchema.pick({ id: true }).array().safeParse(ids)
        if (!validated.success) {
          return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error).toResult()
        }
        return await ipcRenderer.invoke(IpcEvent.Db.CRUD.Delete.ServiceData, ...validated.data)
      }
    },
    PayMethod: {
      create: async (
        data: unknown
      ): Promise<IpcResponseResult<string | ZodError<IPaymentMethodDTO<'CreateSchema'>>>> => {
        const validated = PaymentMethodDTO.CreateSchema.safeParse(data)
        if (!validated.success) {
          return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error).toResult()
        }
        return await ipcRenderer.invoke(IpcEvent.Db.CRUD.Create.PayMethod, validated.data)
      },
      read: async (): Promise<
        IpcResponseResult<string | ZodError<IPaymentMethodDTO<'ReadSchema'>>>
      > => {
        return await ipcRenderer.invoke(IpcEvent.Db.CRUD.Read.PayMethod)
      },
      update: async (
        data: unknown
      ): Promise<IpcResponseResult<string | ZodError<IPaymentMethodDTO<'UpdateSchema'>>>> => {
        const validated = PaymentMethodDTO.UpdateSchema.safeParse(data)
        if (!validated.success) {
          return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error).toResult()
        }
        return await ipcRenderer.invoke(IpcEvent.Db.CRUD.Update.PayMethod, validated.data)
      },
      delete: async (...ids: number[]): Promise<IpcResponseResult<string | ZodError<number[]>>> => {
        const validated = PaymentMethodDTO.ReadSchema.pick({ id: true }).array().safeParse(ids)
        if (!validated.success) {
          return new IpcResponse(StatusCodes.BAD_REQUEST, validated.error).toResult()
        }
        return await ipcRenderer.invoke(IpcEvent.Db.CRUD.Delete.PayMethod, ...validated.data)
      }
    }
  }
} as const
