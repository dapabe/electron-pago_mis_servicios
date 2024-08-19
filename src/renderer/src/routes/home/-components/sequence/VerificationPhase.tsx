import { FormattedMessage } from 'react-intl'
import { IpcEvent } from '#shared/constants/ipc-events'
import { useAppSequence } from '#renderer/hooks/useAppSequence.hook'

export const VerificationPhase = () => {
  const { sequenceDisabled } = useAppSequence()

  const handleSequence = async () => {
    await window.electron.ipcRenderer.invoke(IpcEvent.Sequence.Started)
  }

  return (
    <section>
      <p>Verifica que servicios que hayas seleccionado pagaras</p>
      <button onClick={handleSequence} disabled={!sequenceDisabled}>
        <FormattedMessage id="page.home.tab.verify.init" />
      </button>
    </section>
  )
}
