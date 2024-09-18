import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_menu/services')({
  component: Component
})

function Component() {
  return <div>Hello /app/home/!</div>
}
