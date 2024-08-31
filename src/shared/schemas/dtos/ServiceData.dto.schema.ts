import { SupportedServices } from '#shared/constants/supported-services'
import { z, ZodType } from 'zod'

export class ServiceDataDTO {
  static ReadSchema = z.object({
    id: z.string().uuid(),
    serviceName: SupportedServices,
    userName: z.string(),
    password: z.string(),
    accountNumber: z.number()
  })

  static CreateSchema = ServiceDataDTO.ReadSchema.extend({
    userName: z.string().nullable().default(null),
    password: z.string().nullable().default(null),
    accountNumber: z.number().nullable().default(null)
  })
}

export type IServiceDataDTO<Method extends keyof typeof ServiceDataDTO> =
  (typeof ServiceDataDTO)[Method] extends ZodType
    ? z.TypeOf<(typeof ServiceDataDTO)[Method]>
    : never
