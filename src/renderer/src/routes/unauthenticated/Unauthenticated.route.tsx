import { IpcEvent } from '#shared/constants/ipc-events'
import { IIpcIntegrityInitialize } from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { useQueryClient } from '@tanstack/react-query'
import { useIntl } from 'react-intl'
import { LoginForm } from './-components/Login.form'
import { RegisterForm } from './-components/Register.form'
import { TabPanel } from '../-components/TabPanel'

export const UnauthenticatedRoute = () => {
  const query = useQueryClient().getQueryData([
    IpcEvent.Integrity.Initialize
  ]) as IpcResponse<IIpcIntegrityInitialize>
  const intl = useIntl()

  return (
    <section className="flex justify-center p-2">
      <div className="w-full">
        <TabPanel
          selectedTab={query.data.hasDB ? 1 : 0}
          tabs={[
            {
              title: intl.formatMessage({ id: `page.unauthorized.register.no-db` }),
              isDisabled: query.data.hasDB,
              body: (
                <RegisterForm
                  skipServer={query.data.skipServer}
                  values={{
                    databaseFilePath: query.data.databaseFilePath,
                    password: '',
                    repeatPassword: ''
                  }}
                />
              )
            },
            {
              title: intl.formatMessage({ id: `page.unauthorized.register.has-db` }),
              isDisabled: !query.data.hasDB,
              body: (
                <LoginForm
                  skipServer={query.data.skipServer}
                  values={{
                    password: ''
                  }}
                />
              )
            }
          ]}
        />
      </div>
    </section>
  )
}
