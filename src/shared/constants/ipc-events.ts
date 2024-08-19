import { IFlagConfig } from '#shared/schemas/flags.schema'

/**
 *  Actually is `IpcChannel` but the double 'cC' triggers me
 */
export const IpcEvent = {
  AppVersion: 'appVersion',
  CloseApp: 'closeApp',
  ToggleMaximize: 'toggle-maximize',
  Config: {
    SendInitialConfig: 'config.send-initial',
    Flags: (flag: keyof IFlagConfig) => `config.flag.${flag}` as const
  },
  Sequence: {
    Started: 'sequence.started',
    ToggleInternal: 'sequence.toggle-init'
  }
} as const
