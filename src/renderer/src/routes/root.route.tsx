import { WindowBody } from './-components/WindowBody'
import { NavBar } from './-components/NavBar'
import { Outlet } from 'react-router-dom'

export const RootRoute = (): JSX.Element => {
  return (
    <WindowBody>
      <div className="flex flex-col">
        <div className="window-body">
          <NavBar />
          <div className="p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </WindowBody>
  )
}
