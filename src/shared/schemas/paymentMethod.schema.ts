import { z } from 'zod'
import { CardBrand, CardType } from '#shared/constants/cards'

export const PaymentMethodSchema = z
  .object({
    fullName: z.string().trim().min(1, 'El nombre no puede estar vacio.'),
    payAlias: z.string().trim().min(1, 'El Alias no puede estar vacio.'),
    frontNumber: z.string().refine((val) => /^\d{14,16}$/.test(val), {
      message: `frontNumber tiene que ser un digito entre 14-16.`
    }),
    expireDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\/\d{2,4}$/.test(val), {
      message: `expireDate debe estar formato MM/YY o MM/YYYY.`
    }),
    backNumber: z.string().refine((val) => /^\d{3,4}$/.test(val), {
      message: `backNumber tiene que ser un numero de 3-4 digitos.`
    }),
    cardType: CardType.default('Débito'),
    cardBrand: CardBrand.nullable().default(null)
  })
  .strict()

/**
 * Credit/debit card data structure.
 */
export type IPaymentMethod = z.TypeOf<typeof PaymentMethodSchema>
