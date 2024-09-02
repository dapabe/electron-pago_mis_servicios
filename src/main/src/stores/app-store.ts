import { create } from 'zustand'
import path from 'node:path'
import { app } from 'electron'
import { immer } from 'zustand/middleware/immer'
import { AppSettingsManager, IAppSettingsManager } from '#shared/schemas/settings.schema'
import { writeToFile } from '../utilities/extra-funcs'

type IAppStore = {
  settingsFilePath: string
  settingsData: IAppSettingsManager
  setSettings: (settings: IAppSettingsManager) => void
  /**
   * Asynchronously changes JSON file values
   */
  changeSettings: (cb: (settings: IAppSettingsManager) => void) => Promise<Error | null>
}

export const AppStore = create<IAppStore>()(
  immer((set, get) => ({
    settingsFilePath: path.join(app.getPath('appData'), app.getName(), 'settings.json'),
    settingsData: AppSettingsManager.getLastSchema().parse({}),

    setSettings: (settingsData) => set({ settingsData }),
    changeSettings: async (cb) => {
      return await writeToFile<IAppSettingsManager>({
        filePath: get().settingsFilePath,
        cb,
        onSuccess: (settings) => get().setSettings(settings)
      })
    }
  }))
)
