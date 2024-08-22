import { IFlagConfig } from '#shared/schemas/flags.schema'

const CommonEvents = {
  CloseApp: 'app-close',
  ToggleMaximize: 'app-toggle-maximize'
} as const

/**
 *  Actually is `IpcChannel` but the double 'cC' triggers me
 */
export const IpcEvent = {
  ...CommonEvents,
  Integrity: {
    Initialize: 'integrity.init',
    Loader: 'integrity.loader',
    Verify: {
      Settings: {
        Found: 'integrity.verify.settings.found',
        NotFound: 'integrity.verify.settings.not-found'
      },
      Db: {
        Found: 'integrity.verify.db.found',
        NotFound: 'integrity.verify.db.not-found'
      }
    },
    Login: 'integrity.login',
    Finish: 'integrity.finish'
  },
  Db: {
    Password: {
      Create: 'db.password.create',
      Update: 'db.password.update'
    }
  },
  LanguageChange: {
    Req: 'req.language-change',
    Res: 'res.language-change'
  },
  Settings: {
    Request: 'settings.req',
    Response: 'settings.res',
    Flag: (flag: keyof IFlagConfig) => `settings.flags.${flag}`
  },
  Sequence: {
    Started: 'sequence.started',
    ToggleInternal: 'sequence.toggle-init'
  }
} as const
