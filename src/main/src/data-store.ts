import { create } from 'zustand'
import fs from 'node:fs/promises'
import { IUserData, UserDataManager } from '#shared/schemas/userData.schema'
import { getDefaultsForSchema } from 'zod-defaults'
import path from 'node:path'
import { app } from 'electron'

type IDataStore = {
  dataFilePath: string
  fileData: IUserData

  loadFilePath: () => Promise<void>
  doesFileExists: () => Promise<boolean>
  createFile: () => Promise<void>
}

export const DataStore = create<IDataStore>((set, get) => ({
  dataFilePath: path.join(app.getPath('userData'), '.info.json'),
  fileData: getDefaultsForSchema(UserDataManager.getLastSchema()),

  doesFileExists: async () => {
    return await fs
      .access(get().dataFilePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)
  },

  createFile: async () => {
    const stringified = JSON.stringify(get().fileData)
    await fs.writeFile(get().dataFilePath, stringified, 'utf-8')
  },

  loadFilePath: async () => {
    const exists = await get().doesFileExists()
    if (exists) {
      const data = await fs.readFile(get().dataFilePath, 'utf8')

      set({ fileData: JSON.parse(data) })
    }
  }
}))
