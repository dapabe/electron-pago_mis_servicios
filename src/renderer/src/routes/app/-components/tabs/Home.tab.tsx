import { useAppSequence } from '#renderer/hooks/useAppSequence.hook'
import { IpcEvent } from '#shared/constants/ipc-events'
import { ISupportedServices } from '#shared/constants/supported-services'
import { ChangeEvent, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { twJoin } from 'tailwind-merge'
import { VerificationTable } from '../Verification.table'

const createDefaultValues = <T extends object | undefined>(obj: T, defaultValue: boolean) => {
  const temp = {} as Record<ISupportedServices, boolean>

  if (!obj || !Object.keys(obj).length) return temp

  for (const service of Object.keys(obj)) {
    temp[service] = defaultValue
  }

  return temp
}

export const HomeTab = () => {
  const { hasSequenceStarted } = useAppSequence()

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
        <FormattedMessage id="page.app.tab.home.description" />
      </p>
      <fieldset>
        <legend>
          <button
            onClick={handleSequence}
            className={twJoin(!noSelectedServices && 'default', 'ml-auto')}
            disabled={hasSequenceStarted || !hasServices || noSelectedServices}
          >
            <FormattedMessage id="page.app.tab.home.init" />
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
            <FormattedMessage id="page.app.tab.home.no-services" />{' '}
            <a onClick={() => void 0} className="underline cursor-pointer">
              {'['}
              <FormattedMessage id="page.app.tab.services.title" />
              {']'}
            </a>
            .
          </p>
        )}
      </fieldset>
    </section>
  )
}
