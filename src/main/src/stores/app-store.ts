import { create } from 'zustand'
import path from 'node:path'
import { app } from 'electron'
import { immer } from 'zustand/middleware/immer'
import { AppSettingsManager, IAppSettingsManager } from '#shared/schemas/settings.schema'
import { IFlagConfig } from '#shared/schemas/flags.schema'

type IAppStore = {
  settingsFilePath: string
  settingsData: IAppSettingsManager
  isAuthenticated: boolean

  setSettings: (settings: IAppSettingsManager) => void
  toggleAuth: () => void
  toggleFlag: (flag: keyof IFlagConfig) => void
}

export const AppStore = create<IAppStore>()(
  immer((set) => ({
    settingsFilePath: path.join(app.getPath('appData'), app.getName(), 'settings.json'),
    settingsData: AppSettingsManager.getLastSchema().parse({}),
    isAuthenticated: false,

    setSettings: (settingsData) => set({ settingsData }),
    toggleAuth: () => set((x) => ({ isAuthenticated: !x.isAuthenticated })),
    toggleFlag: (flag) =>
      set((x) => {
        x.settingsData.flags[flag] = !x.settingsData.flags[flag]
        return x
      })
  }))
)
