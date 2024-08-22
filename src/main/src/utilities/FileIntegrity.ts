import { PromisedValue } from '#shared/utilities/promised-value'
import fs from 'node:fs/promises'
import { z } from 'zod'

type IFileIntegrityConfig<DataType> = {
  filePath: string
  defaultData: DataType
  zodSchema: z.ZodType<DataType>
  // parseFn?: ParseFn
  onError?: (error: Error) => void
}

type NonNullableKeys<T extends object> = {
  [K in keyof T]: T[K] extends NonNullable<T[K]> ? K : never
}[keyof T]
type NonOptionalKeys<T extends object> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]
type OnlyDefinedFields<T extends object> = Pick<T, NonNullableKeys<T>>

/**
 *  Assumes files are .json / utf-8 encoding
 */
export class FileIntegrity<DataType extends object> {
  constructor(public config: IFileIntegrityConfig<DataType>) {}

  async isFileOk() {
    let [fileError, fileData] = await PromisedValue(
      async () => await fs.readFile(this.config.filePath, 'utf-8')
    )

    fileData ??= JSON.stringify(this.config.defaultData)

    if (fileError instanceof Error) {
      this.config.onError?.(fileError)
      await fs.writeFile(this.config.filePath, fileData)
    }

    const parsedData = JSON.parse(fileData)
    const verifiedData = this.config.zodSchema.safeParse(parsedData)

    if (!verifiedData.success) {
      await fs.writeFile(this.config.filePath, fileData)
    }

    return verifiedData.data!
  }
}
