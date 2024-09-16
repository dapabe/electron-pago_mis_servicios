import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from './-components/Register.form'
import { useMemo } from 'react'

export const Route = createFileRoute('/auth/register')({
  component: Component
})

function Component() {
  const defaultPass = useMemo(() => (process.env.NODE_ENV === 'development' ? '123' : ''), [])

  return (
    <main className="flex justify-center p-2">
      <div className="w-full">
        <RegisterForm
          values={{
            password: defaultPass,
            repeatPassword: defaultPass
          }}
        />
      </div>
    </main>
  )
}
