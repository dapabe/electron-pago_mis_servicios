import { create } from 'zustand'
import path from 'node:path'
import { app } from 'electron'
import { immer } from 'zustand/middleware/immer'
import { AppSettingsManager, IAppSettingsManager } from '#shared/schemas/settings.schema'

type IAppStore = {
  settingsFilePath: string
  settingsData: IAppSettingsManager

  setSettings: (settings: IAppSettingsManager) => void
}

export const AppStore = create<IAppStore>()(
  immer((set) => ({
    settingsFilePath: path.join(app.getPath('userData'), 'settings.json'),
    settingsData: AppSettingsManager.getLastSchema().parse({}),

    setSettings: (settingsData) => set({ settingsData })
  }))
)
