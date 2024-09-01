import { z, ZodType } from 'zod'
import { CardBrand, CardType } from '#shared/constants/cards'

export class PaymentMethodDTO {
  static ReadSchema = z.object({
    id: z.string().uuid(),
    alias: z.string(),

    fullName: z.string(),
    frontNumber: z.number(),
    expireDate: z.date(),
    securityNumber: z.number(),
    type: CardType,
    brand: CardBrand.nullable()
  })

  static CreateSchema = PaymentMethodDTO.ReadSchema.extend({
    // fullName: z.string().trim().min(1, 'El nombre no puede estar vacio.'),
    // alias: z.string().trim().min(1, 'El Alias no puede estar vacio.'),
    // frontNumber: z.string().refine((val) => /^\d{14,16}$/.test(val), {
    //   message: `frontNumber tiene que ser un digito entre 14-16.`
    // }),
    // expireDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\/\d{2,4}$/.test(val), {
    //   message: `expireDate debe estar formato MM/YY o MM/YYYY.`
    // }),
    // securityNumber: z.string().refine((val) => /^\d{3,4}$/.test(val), {
    //   message: `securityNumber tiene que ser un numero de 3-4 digitos.`
    // })
    type: CardType.optional(),
    brand: CardBrand.optional()
  })

  static UpdateSchema = PaymentMethodDTO.ReadSchema.extend({
    alias: z.string().optional(),
    fullName: z.string().optional(),
    frontNumber: z.number().optional(),
    expireDate: z.date().optional(),
    securityNumber: z.number().optional(),
    type: CardType.optional(),
    brand: CardBrand.optional()
  })
}

export type IPaymentMethodDTO<Method extends keyof typeof PaymentMethodDTO> =
  (typeof PaymentMethodDTO)[Method] extends ZodType
    ? z.TypeOf<(typeof PaymentMethodDTO)[Method]>
    : never
