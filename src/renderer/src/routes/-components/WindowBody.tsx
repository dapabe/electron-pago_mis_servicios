import { PropsWithChildren, useEffect, useState } from 'react'
import style from '#renderer/assets/WindowBody.module.css'
import { twJoin } from 'tailwind-merge'
import { useIntl } from 'react-intl'

type Props = PropsWithChildren
export const WindowBody = ({ children }: Props): JSX.Element => {
  const intl = useIntl()
  const [appTitle, setTitle] = useState('')

  useEffect(() => {
    setTitle(intl.formatMessage({ id: 'appTitle' }))
    document.title = appTitle
  }, [intl.locale])

  const handleMinMax = () => window.electron.ipcRenderer.send('toggle-maximize')
  const handleClose = () => window.electron.ipcRenderer.send('closeApp')

  return (
    <div className="window active max-h-[100vh]">
      <div className={twJoin(`title-bar ${style.draggable}`, 'flex flex-row')}>
        <div className="title-bar-text">{appTitle}</div>
        <div className={`title-bar-controls ${style.noDraggable}`}>
          <button aria-label="Minimize" onClick={handleMinMax}></button>
          <button aria-label="Close" onClick={handleClose}></button>
        </div>
      </div>
      <div className="window-body flex flex-col h-80">{children}</div>
    </div>
  )
}
