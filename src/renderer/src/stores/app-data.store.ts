import { create } from 'zustand'

type IAppDataStore = {
  version: string

  setVersion: (version: string) => void
}

export const useAppDataStore = create<IAppDataStore>((set) => ({
  version: '',

  setVersion: (version) => set({ version })
}))
