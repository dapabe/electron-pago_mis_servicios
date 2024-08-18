import { create } from 'zustand'
import fs from 'node:fs/promises'
import { IUserData, UserDataManager } from '#shared/schemas/userData.schema'
import path from 'node:path'
import { app } from 'electron'
import { IFlagConfig } from '#shared/schemas/flags.schema'
import { immer } from 'zustand/middleware/immer'

type IAppStore = {
  dataFilePath: string
  fileData: IUserData

  loadFilePath: () => Promise<void>
  doesFileExists: () => Promise<boolean>
  createFile: () => Promise<void>

  toggleFlag: (flag: keyof IFlagConfig) => void
}

export const AppStore = create<IAppStore>()(
  immer((set, get) => ({
    dataFilePath: path.join(app.getPath('userData'), '.info.json'),
    fileData: UserDataManager.getLastSchema().parse({}),

    doesFileExists: async () => {
      return await fs
        .access(get().dataFilePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
    },

    createFile: async () => {
      const stringified = JSON.stringify(get().fileData)
      await fs.writeFile(get().dataFilePath, stringified, 'utf8')
    },

    loadFilePath: async () => {
      const exists = await get().doesFileExists()
      if (exists) {
        const data = await fs.readFile(get().dataFilePath, 'utf8')

        set({ fileData: JSON.parse(data) })
      }
    },

    toggleFlag: (flag) => {
      set((x) => {
        x.fileData.flags[flag] = !x.fileData.flags[flag]
      })
    }
  }))
)
