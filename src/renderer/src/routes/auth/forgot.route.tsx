import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from './-components/Login.form'
import { useMemo } from 'react'

export const Route = createFileRoute('/auth/forgot')({
  component: Component
})

function Component() {
  const defaultPass = useMemo(() => (process.env.NODE_ENV === 'development' ? '123' : ''), [])
  return (
    <main className="flex justify-center p-2">
      <div className="w-full">
        <LoginForm
          values={{
            password: defaultPass
          }}
        />
      </div>
    </main>
  )
}
