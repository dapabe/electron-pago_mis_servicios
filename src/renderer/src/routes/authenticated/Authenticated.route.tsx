import { Outlet } from 'react-router-dom'
import { NavBar } from './-components/NavBar'

export const AuthenticatedRoute = () => {
  return (
    <>
      <NavBar />
      <section className="p-2">
        <Outlet />
      </section>
    </>
  )
}
