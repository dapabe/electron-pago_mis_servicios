import { PropsWithChildren, ReactNode } from 'react'
import { IpcEvent } from '#shared/constants/ipc-events'
import { useNavigate } from '@tanstack/react-router'
import { Button, ButtonGroup, Card, CardContent, CardHeader, CardTitle } from 'keep-react'
import * as Icon from 'phosphor-react'
import { WindowStatus } from './WindowStatus'

type Props = PropsWithChildren<{ title?: ReactNode }>
export const WindowBody = ({ children, title }: Props): JSX.Element => {
  const nav = useNavigate()

  const handleMinMax = () => window.electron.ipcRenderer.send(IpcEvent.App.ToggleMaximize)
  const handleClose = () => window.electron.ipcRenderer.send(IpcEvent.App.CloseApp)

  return (
    <Card className="h-screen max-w-full flex flex-col bg-metal-900">
      <CardHeader className="draggable flex items-center">
        <CardTitle className="text-lg ml-2 flex-1">{title}</CardTitle>
        <ButtonGroup className="noDraggable">
          <Button
            variant="link"
            shape="icon"
            color="secondary"
            className="hover:text-metal-100"
            onClick={handleMinMax}
          >
            <Icon.Minus size={32} />
          </Button>
          <Button
            variant="link"
            shape="icon"
            color="secondary"
            className="hover:text-metal-100"
            onClick={async () => await nav({ to: '/help' })}
          >
            <Icon.Question size={32} />
          </Button>
          <Button
            variant="link"
            shape="icon"
            color="error"
            className="hover:text-error-900"
            onClick={handleClose}
          >
            <Icon.X size={32} />
          </Button>
        </ButtonGroup>
      </CardHeader>

      <CardContent className="flex-grow p-0 bg-metal-800 border-y border-y-metal-700">
        {children}
      </CardContent>
      <footer className="draggable px-2 text-metal-500">
        <WindowStatus />
      </footer>
    </Card>
  )
}
