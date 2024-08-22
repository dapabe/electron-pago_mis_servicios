import { z } from 'zod'

export const IpcIntegrityInitializeSchema = z.object({
  dbFilePath: z.string().trim().min(1),
  skipServer: z.boolean()
})

export const IpcIntegrityLoginSchema = IpcIntegrityInitializeSchema.extend({
  password: z.string().trim().min(1)
})

export type IIpcIntegrityInitialize = z.TypeOf<typeof IpcIntegrityInitializeSchema>
export type IIpcIntegrityLogin = z.TypeOf<typeof IpcIntegrityLoginSchema>
