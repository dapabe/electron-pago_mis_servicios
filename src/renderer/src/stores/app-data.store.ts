import { IAppInformation } from '#shared/types/readonly-data'
import { create } from 'zustand'

type IAppDataStore = {
  locales: string[]
  appInfo: IAppInformation | null

  setLocales: (locales: string[]) => void
  setAppInfo: (appInfo: IAppInformation) => void
}

export const useAppDataStore = create<IAppDataStore>((set) => ({
  locales: [],
  appInfo: null,

  setLocales: (locales) => set({ locales }),
  setAppInfo: (appInfo) => set({ appInfo })
}))
