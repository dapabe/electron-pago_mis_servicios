import { PromisedValue } from '#shared/utilities/promised-value'
import fs from 'node:fs/promises'

export async function doesFileExists(filePath: string) {
  return fs
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

type IWriteToFileOptions<T> = {
  filePath: string
  cb: (data: T) => void
  onSuccess?: ((data: T) => void) | ((data: T) => Promise<void>)
}
/**
 *  Assumes file format is utf-8
 */
export async function writeToFile<T>({ filePath, cb, onSuccess }: IWriteToFileOptions<T>) {
  const [jsonErr, data] = await PromisedValue(
    async () => (await fs.readFile(filePath, 'utf-8')) as unknown as T
  )
  if (data) {
    cb(data)
    await fs.writeFile(filePath, JSON.stringify(data), 'utf-8')
    await onSuccess?.(data)
  }

  return jsonErr
}
