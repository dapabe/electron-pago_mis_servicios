import { IpcEvent } from '#shared/constants/ipc-events'
import { IIpcIntegrityInitialize } from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { useQueryClient } from '@tanstack/react-query'
import { FormattedMessage } from 'react-intl'
import { LoginForm } from './-components/Login.form'
import { RegisterForm } from './-components/Register.form'

export const UnauthenticatedRoute = () => {
  const query = useQueryClient().getQueryData([
    IpcEvent.Integrity.Initialize
  ]) as IpcResponse<IIpcIntegrityInitialize>

  return (
    <section className="flex justify-center items-center h-full">
      <div className="window w-3/4">
        <div className="title-bar">
          <div className="title-bar-text mx-auto select-none">
            <FormattedMessage
              id={`page.unauthorized.register.${query.data.hasDB ? 'has-db' : 'no-db'}`}
            />
          </div>
        </div>
        <div className="window-body p-2">
          {!query.data.hasDB ? (
            <LoginForm
              values={{
                skipServer: query.data.skipServer,
                password: ''
              }}
              onSubmit={async () => await void 0}
            />
          ) : (
            <RegisterForm
              values={{
                databaseFilePath: query.data.databaseFilePath,
                skipServer: query.data.skipServer,
                password: '',
                repeatPassword: ''
              }}
              onSubmit={async () => await void 0}
            />
          )}
        </div>
      </div>
    </section>
  )
}
