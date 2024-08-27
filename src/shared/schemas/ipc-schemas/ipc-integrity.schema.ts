import { z } from 'zod'
import { AppSettingsManager } from '../settings.schema'

export const IpcIntegrityInitializeSchema = AppSettingsManager.getLastSchema()
  .omit({
    flags: true
  })
  .merge(
    z
      .object({
        databaseFilePath: z.string().trim().min(1, 'errors.form.is-empty'),
        hasDB: z.boolean()
      })
      .strict()
  )

export const IpcIntegrityRegisterSchema = IpcIntegrityInitializeSchema.pick({
  databaseFilePath: true
})
  .extend({
    password: z.string().trim().min(1, 'errors.form.is-empty'),
    repeatPassword: z.string().trim().min(1, 'errors.form.is-empty')
  })
  .refine((x) => x.password === x.repeatPassword, {
    path: ['samePassword'],
    message: 'errors.form.passwords-not-equal'
  })

export const IpcIntegrityLoginSchema = z
  .object({
    password: z.string().trim().min(1, 'errors.form.is-empty')
  })
  .strict()

export type IIpcIntegrityInitialize = z.TypeOf<typeof IpcIntegrityInitializeSchema>
export type IIpcIntegrityRegister = z.TypeOf<typeof IpcIntegrityRegisterSchema>
export type IIpcIntegrityLogin = z.TypeOf<typeof IpcIntegrityLoginSchema>
