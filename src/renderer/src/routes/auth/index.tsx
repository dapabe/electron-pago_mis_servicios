import { IpcEvent } from '#shared/constants/ipc-events'
import { IIpcIntegrityInitialize } from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponseResult } from '#shared/utilities/IpcResponse'
import { useQueryClient } from '@tanstack/react-query'
import { useIntl } from 'react-intl'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: Component
})

function Component() {
  const query = useQueryClient().getQueryData([
    IpcEvent.Integrity.Initialize
  ]) as IpcResponseResult<IIpcIntegrityInitialize>

  const intl = useIntl()

  return (
    <main className="flex justify-center p-2">
      <div className="w-full">
        {/* <TabPanel
          selectedTab={Number(query.data.hasDB)}
          tabs={[
            {
              title: intl.formatMessage({ id: `page.unauthorized.register.no-db` }),
              isDisabled: query.data.hasDB,
              body: (
                <RegisterForm
                  values={{
                    databaseFilePath: query.data.databaseFilePath,
                    password: '123',
                    repeatPassword: '123'
                  }}
                />
              )
            },
            {
              title: intl.formatMessage({ id: `page.unauthorized.register.has-db` }),
              isDisabled: !query.data.hasDB,
              body: (
                <LoginForm
                  values={{
                    password: '123'
                  }}
                />
              )
            }
          ]}
        /> */}
      </div>
    </main>
  )
}
