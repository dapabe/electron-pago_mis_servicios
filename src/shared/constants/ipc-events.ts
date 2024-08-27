import { IFlagConfig } from '#shared/schemas/flags.schema'

/**
 *  Actually is `IpcChannel` but the double 'cC' triggers me
 */
export const IpcEvent = {
  App: {
    CloseApp: 'app.close',
    ToggleMaximize: 'app.toggle-maximize',
    Info: 'app.info'
  },
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
    Finish: 'integrity.finish'
  },
  Db: {
    Register: 'db.register',
    Login: 'db.login',
    SelectFile: 'db.select-file',
    Password: {
      // Create: 'db.password.create',
      Update: 'db.password.update'
    }
  },
  Language: {
    Messages: 'language.messages'
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
