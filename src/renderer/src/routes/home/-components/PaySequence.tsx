import { FormattedMessage } from 'react-intl'

export const PaySequence = () => {
  const d = () => {
    window.electron.ipcRenderer.send('startSequence')
  }

  return (
    <div>
      <button onClick={d}>
        <FormattedMessage id="page.home.tab.verify.init" />
      </button>
    </div>
  )
}
