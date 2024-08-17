import { PropsWithChildren } from 'react'
import style from '#renderer/assets/WindowBody.module.css'
import { FormattedMessage } from 'react-intl'

type Props = PropsWithChildren
export const WindowBody = ({ children }: Props): JSX.Element => {
  const handleMinMax = () => window.electron.ipcRenderer.send('toggle-maximize')
  const handleClose = () => window.electron.ipcRenderer.send('closeApp')

  return (
    <div className="window active min-h-[100vh]">
      <div className={`title-bar ${style.draggable}`}>
        <div className="title-bar-text">
          <FormattedMessage id="appTitle" />
        </div>
        <div className={`title-bar-controls ${style.noDraggable}`}>
          <button aria-label="Minimize" onClick={handleMinMax}></button>
          <button aria-label="Close" onClick={handleClose}></button>
        </div>
      </div>
      {children}
    </div>
  )
}
