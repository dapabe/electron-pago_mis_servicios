import fs from 'node:fs/promises'

export async function doesFileExists(filePath: string) {
  return fs
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}
