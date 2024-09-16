import { createFileRoute } from '@tanstack/react-router'
import { FormattedMessage } from 'react-intl'
import { LoginForm } from './-components/Login.form'
import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '#renderer/shadcn/ui/card'

export const Route = createFileRoute('/auth/login')({
  component: Component
})

function Component() {
  const defaultPass = useMemo(() => (process.env.NODE_ENV === 'development' ? '123' : ''), [])

  return (
    <main className="flex justify-center items-center p-2 h-full flex-col bg-secondary">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            <FormattedMessage id="page.auth.has-db" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm
            values={{
              password: defaultPass
            }}
          />
        </CardContent>
      </Card>
    </main>
  )
}
