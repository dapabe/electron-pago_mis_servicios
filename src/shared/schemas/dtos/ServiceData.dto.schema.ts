import { SupportedServices } from '#shared/constants/supported-services'
import { z, ZodType } from 'zod'

export class ServiceDataDTO {
  static ReadSchema = z.object({
    id: z.number().positive(),
    serviceName: SupportedServices,
    userName: z.string(),
    password: z.string(),
    accountNumber: z.number()
  })

  static CreateSchema = ServiceDataDTO.ReadSchema.extend({
    userName: z.string().nullable(),
    password: z.string().nullable(),
    accountNumber: z.number().nullable()
  })

  static UpdateSchema = ServiceDataDTO.ReadSchema.omit({ serviceName: true }).extend({
    userName: z.string().optional(),
    password: z.string().optional(),
    accountNumber: z.number().optional()
  })
}

export type IServiceDataDTO<Method extends keyof typeof ServiceDataDTO> =
  (typeof ServiceDataDTO)[Method] extends ZodType
    ? z.TypeOf<(typeof ServiceDataDTO)[Method]>
    : never
