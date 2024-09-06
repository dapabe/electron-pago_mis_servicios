import { IpcEvent } from '#shared/constants/ipc-events'
import { IIpcIntegrityInitialize } from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponseResult } from '#shared/utilities/IpcResponse'
import { useIntl } from 'react-intl'
import { createFileRoute } from '@tanstack/react-router'
import { StepPanel } from '../-components/StepPanel'
import { RegisterForm } from './-components/Register.form'
import { LoginForm } from './-components/Login.form'
import { useQueryClient } from '@tanstack/react-query'
import { Label } from 'keep-react'
import { useMemo } from 'react'

export const Route = createFileRoute('/auth/')({
  component: Component
})

function Component() {
  const query = useQueryClient().getQueryData([
    IpcEvent.Integrity.Initialize
  ]) as IpcResponseResult<IIpcIntegrityInitialize>

  const intl = useIntl()

  const defaultPass = useMemo(() => (process.env.NODE_ENV === 'development' ? '123' : ''), [])

  if (query.data.hasDB) {
    return (
      <main className="flex justify-center items-center p-2 h-full flex-col">
        <section className="m-auto max-w-sm space-y-4 rounded-lg border p-8 shadow-md backdrop-blur-md bg-metal-100/50">
          <Label className="block cursor-default text-heading-6 text-center">
            {intl.formatMessage({ id: `page.unauthorized.register.has-db` })}
          </Label>
          <LoginForm
            values={{
              password: defaultPass
            }}
          />
        </section>
      </main>
    )
  }

  return (
    <main className="flex justify-center p-2">
      <div className="w-full">
        <StepPanel
          steps={[
            {
              title: intl.formatMessage({ id: `page.unauthorized.register.no-db` }),
              body: (
                <RegisterForm
                  values={{
                    databaseFilePath: query.data.databaseFilePath,
                    password: defaultPass,
                    repeatPassword: defaultPass
                  }}
                />
              )
            },
            {
              title: intl.formatMessage({ id: `page.unauthorized.register.has-db` }),
              body: (
                <LoginForm
                  values={{
                    password: defaultPass
                  }}
                />
              )
            }
          ]}
        />
      </div>
    </main>
  )
}
