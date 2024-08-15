import { FlagConfigManager, IFlagConfig } from '@renderer/common/schemas/flags.schema'
import { create } from 'zustand'
import { getDefaultsForSchema } from 'zod-defaults'

type UserDataStore = {
  flags: IFlagConfig | null

  toggleFlag: (flag: keyof IFlagConfig) => void
}

export const useUserDataStore = create<UserDataStore>((set) => ({
  flags: getDefaultsForSchema(FlagConfigManager.getLastSchema()),

  toggleFlag: (flag) => {
    set((x) => ({ flags: { ...x.flags!, [flag]: !x.flags![flag] } }))
  }
}))
