import { PropsWithChildren, useEffect, useState } from 'react'
import style from '#renderer/assets/WindowBody.module.css'
import { twJoin } from 'tailwind-merge'
import { useIntl } from 'react-intl'
import { WindowStatus } from './WindowStatus'
import { IpcEvent } from '#shared/constants/ipc-events'
import { useNavigate } from '@tanstack/react-router'
import { Button } from 'keep-react'

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
    <div className="max-h-[100vh]">
      <div className={twJoin(style.draggable, 'flex flex-row')}>
        <div className="">{appTitle}</div>
        <div className={`${style.noDraggable}`}>
          <Button onClick={handleMinMax}></Button>
          <Button onClick={async () => await nav({ to: '/help' })}></Button>
          <Button onClick={handleClose}></Button>
        </div>
      </div>
      <main className="">{children}</main>
      <WindowStatus />
    </div>
  )
}
