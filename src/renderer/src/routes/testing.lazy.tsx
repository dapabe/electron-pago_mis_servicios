import { Button } from '#renderer/shadcn/ui/button'
import { createLazyFileRoute, Navigate, useRouter } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/testing')({
  component: Component
})

function Component() {
  const router = useRouter()

  if (process.env.NODE_ENV === 'production') return <Navigate to="/" />

  return (
    <main className="p-2">
      <h2 className="text-md text-center underline underline-offset-4">Testing Route</h2>
      <Button variant="secondary" className="rounded" onClick={() => router.history.go(-1)}>
        GoBack
      </Button>
    </main>
  )
}
