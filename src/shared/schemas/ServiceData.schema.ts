import { SupportedServices } from '#shared/constants/supported-services'
import { z } from 'zod'

/**
 *  Service data structure and associated service name.
 */
export const ServiceDataSchema = z.object({
  id: z.string().uuid(),
  service_name: SupportedServices,
  user_name: z.string().nullable().default(null),
  password: z.string().nullable().default(null),
  account_number: z.number().nullable().default(null)
})

export type IServiceData = z.TypeOf<typeof ServiceDataSchema>
