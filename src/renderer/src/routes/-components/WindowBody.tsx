import { PropsWithChildren, ReactNode } from 'react'
import { IpcEvent } from '#shared/constants/ipc-events'
import { useNavigate } from '@tanstack/react-router'
import { WindowStatus } from './WindowStatus'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '#renderer/shadcn/ui/navigation-menu'
import { Button } from '#renderer/shadcn/ui/button'
import * as Icon from 'lucide-react'

type Props = PropsWithChildren<{ title?: ReactNode }>
export const WindowBody = ({ children, title }: Props): JSX.Element => {
  const nav = useNavigate()

  const handleMinMax = () => window.electron.ipcRenderer.send(IpcEvent.App.ToggleMaximize)
  const handleClose = () => window.electron.ipcRenderer.send(IpcEvent.App.CloseApp)

  return (
    <div className="h-screen flex flex-col">
      <header className="draggable flex flex-row p-0 items-center">
        <h1 className="text-lg ml-2 flex-1 block text-primary">{title}</h1>
        <NavigationMenu className="noDraggable">
          <NavigationMenuList className="space-x-0">
            <NavigationMenuItem>
              <Button variant="ghost" className="px-3" onClick={handleMinMax}>
                <Icon.Minus size={18} />
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="ghost"
                className="px-3"
                onClick={async () => await nav({ to: '/help' })}
              >
                <Icon.CircleHelp size={18} />
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" className="px-3 hover:bg-destructive" onClick={handleClose}>
                <Icon.X size={18} />
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <div className="flex-grow border-y border-accent">{children}</div>
      <footer className="draggable pb-0">
        <WindowStatus />
      </footer>
    </div>
  )
}
