import { PropsWithChildren } from 'react'
import style from '@renderer/assets/WindowBody.module.css'
import { FormattedMessage } from 'react-intl'
import { ipcRenderer } from 'electron'

type Props = PropsWithChildren
export const WindowBody = ({ children }: Props): JSX.Element => {
  const handleMin = (): void => {
    // BrowserWindow.getFocusedWindow()?.minimize()
  }
  const handleMax = () => ipcRenderer.send('toggle-maximize')

  const handleClose = () => window.close()

  return (
    <div className="window active min-h-[100vh] rounded-none">
      <div className={`title-bar ${style.draggable}`}>
        <div className="title-bar-text">
          <FormattedMessage id="appTitle" />
        </div>
        <div className={`title-bar-controls ${style.noDraggable}`}>
          <button aria-label="Minimize" onClick={handleMin}></button>
          <button aria-label="Maximize" onClick={handleMax}></button>
          <button aria-label="Close" onClick={handleClose}></button>
        </div>
      </div>
      {children}
    </div>
  )
}
