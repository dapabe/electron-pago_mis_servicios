import { createFileRoute, Outlet } from '@tanstack/react-router'
import { NavBar } from './-components/NavBar'

export const Route = createFileRoute('/authenticated/')({
  component: Component
})

function Component() {
  return (
    <>
      <NavBar />
      <section className="p-2">
        <Outlet />
      </section>
    </>
  )
}
