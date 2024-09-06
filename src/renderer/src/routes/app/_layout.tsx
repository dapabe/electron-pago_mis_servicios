import { createFileRoute, Outlet } from '@tanstack/react-router'
import { NavBar } from './-components/NavBar'

export const Route = createFileRoute('/app/_layout')({
  component: Component
})

function Component() {
  return (
    <main>
      <NavBar />
      <Outlet />
    </main>
  )
}
