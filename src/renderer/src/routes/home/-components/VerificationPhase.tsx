import { FormattedMessage } from 'react-intl'
import { IpcEvent } from '#shared/constants/ipc-events'

export const VerificationPhase = () => {
  const handleSequence = () => {
    window.electron.ipcRenderer.send(IpcEvent.StartSequence)
  }

  return (
    <section>
      <p>Verifica que servicios que hayas seleccionado pagaras</p>

      <button onClick={handleSequence}>
        <FormattedMessage id="page.home.tab.verify.init" />
      </button>
    </section>
  )
}
