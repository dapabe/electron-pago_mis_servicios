import { FormattedMessage } from 'react-intl'
import { IpcEvent } from '#shared/constants/ipc-events'
import { useAppSequence } from '#renderer/hooks/useAppSequence.hook'
import { VerificationTable } from './Verification.table'
import { ChangeEvent, useMemo, useState } from 'react'
import { ISupportedServices } from '#shared/constants/supported-services'
import { twJoin } from 'tailwind-merge'
import { useTabPanel } from '#renderer/hooks/useTabPanel.hook'
import { useUserDataStore } from '#renderer/stores/user-data.store'

const createDefaultValues = <T extends object | undefined>(obj: T, defaultValue: boolean) => {
  const temp = {} as Record<ISupportedServices, boolean>

  if (obj === undefined) return temp

  for (const service of Object.keys(obj)) {
    temp[service] = defaultValue
  }

  return temp
}

export const VerificationPhase = () => {
  const { data } = useUserDataStore()

  const { hasSequenceStarted } = useAppSequence()

  const [valuesToBePaid, setToBePaid] = useState(createDefaultValues(data?.serviceFields, false))
  const [valuesToInvalidate, setInvalidation] = useState(
    createDefaultValues(data?.serviceFields, true)
  )
  const { goToTab } = useTabPanel()

  const hasServices = useMemo(() => Object.keys(valuesToBePaid).length > 0, [data?.serviceFields])

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
    await window.electron.ipcRenderer.invoke(IpcEvent.Sequence.Started)
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
            className={twJoin(hasServices && 'default', 'ml-auto')}
            disabled={hasSequenceStarted || !hasServices}
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
            <a onClick={() => goToTab(1)} className="underline cursor-pointer">
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
