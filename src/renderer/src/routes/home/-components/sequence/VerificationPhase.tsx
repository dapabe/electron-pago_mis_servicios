import { FormattedMessage } from 'react-intl'
import { IpcEvent } from '#shared/constants/ipc-events'
import { useAppSequence } from '#renderer/hooks/useAppSequence.hook'
import { VerificationTable } from './Verification.table'

export const VerificationPhase = () => {
  const { hasSequenceStarted } = useAppSequence()

  const handleSequence = async () => {
    await window.electron.ipcRenderer.invoke(IpcEvent.Sequence.Started)
  }

  return (
    <section className="space-y-2">
      <p>
        <FormattedMessage id="page.home.tab.verify.description" />
      </p>
      <fieldset>
        <legend>
          <button onClick={handleSequence} className="ml-auto" disabled={hasSequenceStarted}>
            <FormattedMessage id="page.home.tab.verify.init" />
          </button>
        </legend>
        <VerificationTable hasSequenceStarted={hasSequenceStarted} />
      </fieldset>
    </section>
  )
}
