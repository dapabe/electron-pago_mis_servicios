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
      Reset: 'db.password.reset',
      Update: 'db.password.update'
    },
    isAuthenticated: 'db.is-authenticated',
    CRUD: {
      Create: {
        ServiceData: 'db.create.service-data',
        PayMethod: 'db.create.pay-method'
      },
      Read: {
        ServiceData: 'db.read.service-data',
        PayMethod: 'db.read.pay-method'
      },
      Update: {
        ServiceData: 'db.update.service-data',
        PayMethod: 'db.update.pay-method'
      },
      Delete: {
        ServiceData: 'db.delete.service-data',
        PayMethod: 'db.delete.pay-method'
      }
    }
  },
  Language: {
    Messages: 'language.messages'
  },
  Settings: {
    Request: 'settings.req',
    Response: 'settings.res',
    Flag: (flag: keyof IFlagConfig) => `settings.flags.${flag}` as const
  },
  Sequence: {
    Started: 'sequence.started',
    ToggleInternal: 'sequence.toggle-init'
  }
} as const
