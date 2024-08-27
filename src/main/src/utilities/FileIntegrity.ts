import { PromisedValue } from '#shared/utilities/promised-value'
import fs from 'node:fs/promises'
import { z } from 'zod'

type IFileIntegrityConfig<DataType, T> = {
  filePath: string
  defaultData: DataType
  zodSchema: z.ZodType<DataType>
  // parseFn?: ParseFn
  onError: (error: Error) => T
  onSuccess: () => T
}

/**
 *  Assumes files are .json / utf-8 encoding
 */
export class FileIntegrity<DataType extends object, onFinal> {
  constructor(public config: IFileIntegrityConfig<DataType, NonNullable<onFinal>>) {}

  async isFileOk(): Promise<{ onFinal: NonNullable<onFinal>; data: DataType }> {
    let [fileError, fileData] = await PromisedValue(
      async () => await fs.readFile(this.config.filePath, 'utf-8')
    )

    fileData ??= JSON.stringify(this.config.defaultData)

    if (fileError instanceof Error) {
      const onFinal = this.config.onError(fileError)
      await fs.writeFile(this.config.filePath, fileData)
      return { onFinal, data: this.config.defaultData }
    }

    const verifiedData = this.config.zodSchema.safeParse(this.config.defaultData)

    if (!verifiedData.success) {
      const onFinal = this.config.onError(verifiedData.error)
      await fs.writeFile(this.config.filePath, fileData)
      return { onFinal, data: this.config.defaultData }
    }

    const onFinal = this.config.onSuccess?.()
    return { onFinal, data: verifiedData.data }
  }
}
