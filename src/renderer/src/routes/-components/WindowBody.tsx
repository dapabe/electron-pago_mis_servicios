import { PropsWithChildren, ReactNode } from 'react'
import style from '#renderer/assets/WindowBody.module.css'
import { NavBar } from '../home/-components/NavBar'
import { WindowStatus } from './WindowStatus'
import { twJoin } from 'tailwind-merge'

type Props = PropsWithChildren<{
  title: ReactNode
}>
export const WindowBody = ({ children, title }: Props): JSX.Element => {
  const handleMinMax = () => window.electron.ipcRenderer.send('toggle-maximize')
  const handleClose = () => window.electron.ipcRenderer.send('closeApp')

  return (
    <div className="window active max-h-[100vh]">
      <div className={twJoin(`title-bar ${style.draggable}`, 'flex flex-row')}>
        <div className="title-bar-text">{title}</div>
        <div className={`title-bar-controls ${style.noDraggable}`}>
          <button aria-label="Minimize" onClick={handleMinMax}></button>
          <button aria-label="Close" onClick={handleClose}></button>
        </div>
      </div>
      <div className="window-body flex flex-col h-80">
        <NavBar />
        <div className="p-2 overflow-y-auto">{children}</div>
      </div>
      <WindowStatus />
    </div>
  )
}
