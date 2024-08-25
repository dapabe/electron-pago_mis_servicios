import { z } from 'zod'
import {
  ExtractSchemaManagerType,
  IValidVersions,
  SchemaUtilities,
  ZodSchemaManager
} from './ZodSchemaManager'
import { FlagConfigManager } from './flags.schema'

type LastVer = '0.0.0'

class AppSettingsSchema
  extends ZodSchemaManager<typeof AppSettingsSchema, LastVer>
  implements SchemaUtilities
{
  static '0.0.0' = z
    .object({
      databaseFilePath: z.string().nullable().default(null),
      preferredLocale: z.string().default('es'),
      flags: FlagConfigManager.getLastSchema().default(FlagConfigManager.getLastSchema().parse({}))
    })
    .strict()

  constructor() {
    super(AppSettingsSchema, '0.0.0')
  }

  getLastSchema() {
    return AppSettingsSchema[this.getLastVersion()]
  }
}

export const AppSettingsManager = new AppSettingsSchema()

export type IAppSettingsManager<V extends IValidVersions<typeof AppSettingsSchema> = LastVer> =
  ExtractSchemaManagerType<typeof AppSettingsSchema, V>
