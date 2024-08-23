import { z } from 'zod'
import { AppSettingsManager } from '../settings.schema'

export const IpcIntegrityInitializeSchema = AppSettingsManager.getLastSchema()
  .omit({
    flags: true
  })
  .merge(
    z.object({
      databaseFilePath: z.string().trim().min(1),
      hasDB: z.boolean(),
      skipServer: z.boolean()
    })
  )

export const IpcIntegrityRegisterSchema = IpcIntegrityInitializeSchema.omit({
  hasDB: true,
  preferredLocale: true
})
  .extend({
    password: z.string().trim().min(1),
    repeatPassword: z.string().trim().min(1)
  })
  .refine((x) => x.password === x.repeatPassword)

export const IpcIntegrityLoginSchema = IpcIntegrityInitializeSchema.omit({
  hasDB: true,
  preferredLocale: true,
  databaseFilePath: true
}).extend({
  password: z.string().trim().min(1)
})

export type IIpcIntegrityInitialize = z.TypeOf<typeof IpcIntegrityInitializeSchema>
export type IIpcIntegrityRegister = z.TypeOf<typeof IpcIntegrityRegisterSchema>
export type IIpcIntegrityLogin = z.TypeOf<typeof IpcIntegrityLoginSchema>
