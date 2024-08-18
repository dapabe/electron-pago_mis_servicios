import { IpcEvent } from '#shared/constants/ipc-events'
import { IFlagConfig } from '#shared/schemas/flags.schema'
import { create } from 'zustand'

type UserDataStore = {
  flags: IFlagConfig | null
  setFlags: (config: IFlagConfig) => void
  toggleFlag: (flag: keyof IFlagConfig) => void
}

export const useUserDataStore = create<UserDataStore>((set) => ({
  flags: null,

  setFlags: (flags) => set({ flags }),

  toggleFlag: (flag) => {
    window.electron.ipcRenderer.send(IpcEvent.Config.Flags(flag))
  }
}))
