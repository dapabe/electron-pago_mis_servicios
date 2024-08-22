import { z } from 'zod'
import { ZodSemverUnbranded } from 'zod-semver'
import { IValidVersions, SchemaUtilities, ZodSchemaManager } from './ZodSchemaManager'

type LastV = '0.0.0'

/**
 * Encrypted application data.
 */
class EncryptedDataSchema
  extends ZodSchemaManager<typeof EncryptedDataSchema, LastV>
  implements SchemaUtilities
{
  static '0.0.0' = z.object({
    preferredLocale: z.string().trim().default('es'),
    version: ZodSemverUnbranded,
    salt: z.string().trim(),
    encryptedData: z.string()
  })

  constructor() {
    super(EncryptedDataSchema, '0.0.0')
  }

  getLastSchema() {
    return EncryptedDataSchema[this.getLastVersion()]
  }
}

export const EncryptedDataManager = new EncryptedDataSchema()

export type IEncryptedData<V extends IValidVersions<typeof EncryptedDataSchema> = LastV> = z.TypeOf<
  (typeof EncryptedDataSchema)[V]
>
