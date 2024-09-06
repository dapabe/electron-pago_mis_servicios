import { FormattedMessage } from 'react-intl'
import { useAppSequence } from '#renderer/hooks/useAppSequence.hook'
import { VerificationTable } from './Verification.table'
import { ChangeEvent, useMemo, useState } from 'react'
import { ISupportedServices } from '#shared/constants/supported-services'
import { twJoin } from 'tailwind-merge'
import { IpcEvent } from '#shared/constants/ipc-events'
import { useStepPanel } from '#renderer/hooks/useStepPanel.hook'

const createDefaultValues = <T extends object | undefined>(obj: T, defaultValue: boolean) => {
  const temp = {} as Record<ISupportedServices, boolean>

  if (!obj || !Object.keys(obj).length) return temp

  for (const service of Object.keys(obj)) {
    temp[service] = defaultValue
  }

  return temp
}

export const VerificationPhase = () => {
  const { hasSequenceStarted } = useAppSequence()
  const { goToStep } = useStepPanel()

  const [valuesToBePaid, setToBePaid] = useState(createDefaultValues({}?.serviceFields, false))
  const [valuesToInvalidate, setInvalidation] = useState(
    createDefaultValues({}?.serviceFields, false)
  )

  const hasServices = useMemo(() => Object.keys(valuesToBePaid).length > 0, [{}?.serviceFields])
  const noSelectedServices = useMemo(
    () => Object.values(valuesToInvalidate).every(Boolean),
    [valuesToInvalidate]
  )

  const handleToBePaid = (evt: ChangeEvent<HTMLInputElement>) => {
    const service = evt.currentTarget.name
    const value = evt.currentTarget.checked
    setToBePaid((x) => ({ ...x, [service as keyof ISupportedServices]: value }))
  }
  const handleInvalidation = (evt: ChangeEvent<HTMLInputElement>) => {
    const service = evt.currentTarget.name
    const value = evt.currentTarget.checked
    setInvalidation((x) => ({ ...x, [service as keyof ISupportedServices]: value }))
  }

  const handleSequence = async () => {
    const strippedServices = {}

    for (const [service, value] of Object.entries(valuesToBePaid)) {
      if (valuesToInvalidate[service]) continue
      strippedServices[service] = value
    }
    await window.electron.ipcRenderer.invoke(IpcEvent.Sequence.Started, strippedServices)
  }
  return (
    <section className="space-y-2">
      <p>
        <FormattedMessage id="page.home.tab.verify.description" />
      </p>
      <fieldset>
        <legend>
          <button
            onClick={handleSequence}
            className={twJoin(!noSelectedServices && 'default', 'ml-auto')}
            disabled={hasSequenceStarted || !hasServices || noSelectedServices}
          >
            <FormattedMessage id="page.home.tab.verify.init" />
          </button>
        </legend>
        {hasServices ? (
          <VerificationTable
            hasSequenceStarted={hasSequenceStarted}
            invalidateValues={valuesToInvalidate}
            handleInvalidation={handleInvalidation}
            toBePaidValues={valuesToBePaid}
            handleToBePaid={handleToBePaid}
          />
        ) : (
          <p>
            <FormattedMessage id="page.home.tab.verify.no-services" />{' '}
            <a onClick={() => goToStep(1)} className="underline cursor-pointer">
              {'['}
              <FormattedMessage id="page.home.tab.services.title" />
              {']'}
            </a>
            .
          </p>
        )}
      </fieldset>
    </section>
  )
}
