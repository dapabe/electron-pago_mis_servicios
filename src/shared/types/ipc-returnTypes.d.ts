import { IUserData } from '#shared/schemas/userData.schema'
import { StatusCodes } from 'http-status-codes'

export type IpcEventReturnType = {
  /** Intl Message formats, aka json format*/
  LanguageChange: Record<string, string>
  Config: {
    InitialConfig: {
      appVersion: string
      preferredLocale: string
      locales: string[]
      config: IUserData
    }
  }
  Integrity: {
    Initialize: {
      dbFilePath: string
      skipServer: boolean
    }
    Login: Partial<
      IpcEventReturnType['Integrity']['Initialize'] & {
        password: string
      }
    >
  }
  Error: {
    message: string
    status: StatusCodes
  }
}

/**
 *  To be used on renderer route loaders
 */
export type HandledBackendError<T> = [null, T] | [IpcEventReturnType['Error'], null]
