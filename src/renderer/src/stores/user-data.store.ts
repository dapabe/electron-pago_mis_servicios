import { IpcEvent } from '#shared/constants/ipc-events'
import { IFlagConfig } from '#shared/schemas/flags.schema'
import { IUserData } from '#shared/schemas/userData.schema'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type UserDataStore = {
  data: IUserData | null
  setConfig: (config: IUserData) => void
  toggleFlag: (flag: keyof IFlagConfig) => Promise<void>
  setFlag: (flag: keyof IFlagConfig, value: boolean) => void
}

export const useUserDataStore = create<UserDataStore>()(
  immer((set) => ({
    data: null,

    setConfig: (data) => set({ data }),

    toggleFlag: async (flag) => {
      await window.electron.ipcRenderer.invoke(IpcEvent.Config.Flags(flag))
    },

    setFlag: (flag, value) => {
      set((x) => {
        x.data!.flags[flag] = value
      })
    }
  }))
)
