import { PropsWithChildren, useEffect, useState } from 'react'
import style from '#renderer/assets/WindowBody.module.css'
import { twJoin } from 'tailwind-merge'
import { useIntl } from 'react-intl'
import { WindowStatus } from './WindowStatus'
import { IpcEvent } from '#shared/constants/ipc-events'
import { useNavigate } from '@tanstack/react-router'
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from 'keep-react'
import { IconHelp, IconMinus, IconX } from '@tabler/icons-react'

type Props = PropsWithChildren
export const WindowBody = ({ children }: Props): JSX.Element => {
  const [appTitle, setTitle] = useState('')
  const nav = useNavigate()
  const intl = useIntl()

  useEffect(() => {
    setTitle(intl.formatMessage({ id: 'appTitle' }))
    document.title = appTitle
  }, [intl.messages, intl.locale])

  const handleMinMax = () => window.electron.ipcRenderer.send(IpcEvent.App.ToggleMaximize)
  const handleClose = () => window.electron.ipcRenderer.send(IpcEvent.App.CloseApp)

  return (
    <Card className="flex flex-col max-w-full max-h-full border-0">
      <CardHeader
        className={twJoin(style.draggable, 'flex bg-metal-700 border-b border-metal-900')}
      >
        <CardTitle>{appTitle}</CardTitle>
        <ButtonGroup className={twJoin(style.noDraggable, 'ml-auto')}>
          <Button position="start" size="sm" onClick={handleMinMax}>
            <IconMinus />
          </Button>
          <Button position="center" size="sm" onClick={async () => await nav({ to: '/help' })}>
            <IconHelp />
          </Button>
          <Button position="end" size="sm" onClick={handleClose}>
            <IconX />
          </Button>
        </ButtonGroup>
      </CardHeader>
      <CardContent className="py-0 h-full">
        <main>{children}</main>
      </CardContent>
      <CardDescription>
        <WindowStatus />
      </CardDescription>
    </Card>
  )
}
