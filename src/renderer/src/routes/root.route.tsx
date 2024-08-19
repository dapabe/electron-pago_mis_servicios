import { WindowBody } from './-components/WindowBody'
import { NavBar } from './home/-components/NavBar'
import { Outlet } from 'react-router-dom'
import { WindowStatus } from './-components/WindowStatus'

export const RootRoute = (): JSX.Element => {
  return (
    <WindowBody>
      <div className="window-body flex flex-col min-h-80">
        <NavBar />
        <div className="p-2 overflow-y-auto">
          <Outlet />
        </div>
      </div>
      <WindowStatus />
    </WindowBody>
  )
}
