import { create } from 'zustand'

type IAppDataStore = {
  version: string
  locales: string[]

  setVersion: (version: string) => void
  setLocales: (locales: string[]) => void
}

export const useAppDataStore = create<IAppDataStore>((set) => ({
  version: '',
  locales: [],

  setVersion: (version) => set({ version }),
  setLocales: (locales) => set({ locales })
}))
