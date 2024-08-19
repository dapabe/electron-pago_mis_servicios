import { FormattedMessage } from 'react-intl'
import { IpcEvent } from '#shared/constants/ipc-events'
import { useAppSequence } from '#renderer/hooks/useAppSequence.hook'
import { VerificationTable } from './Verification.table'

export const VerificationPhase = () => {
  const { sequenceDisabled } = useAppSequence()

  const handleSequence = async () => {
    await window.electron.ipcRenderer.invoke(IpcEvent.Sequence.Started)
  }

  return (
    <section className="space-y-2">
      <p>Verifica que servicios que hayas seleccionado pagaras</p>
      <fieldset>
        <legend>
          <button onClick={handleSequence} className="ml-auto" disabled={!sequenceDisabled}>
            <FormattedMessage id="page.home.tab.verify.init" />
          </button>
        </legend>
        <VerificationTable />
      </fieldset>
    </section>
  )
}
