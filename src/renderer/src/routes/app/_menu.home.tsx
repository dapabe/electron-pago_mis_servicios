import { Button } from '#renderer/shadcn/ui/button'
import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router'
import { FormattedMessage } from 'react-intl'
import { VerificationTable } from './-components/Verification.table'
import { useAppSequence } from '#renderer/hooks/useAppSequence.hook'
import { ChangeEvent, useMemo, useState } from 'react'
import { ISupportedServices } from '#shared/constants/supported-services'
import { IpcEvent } from '#shared/constants/ipc-events'

export const Route = createFileRoute('/app/_menu/home')({
  loader: async (ctx) => {
    const data = (await ctx.context.queryClient.getQueryData([
      IpcEvent.Db.CRUD.Read.ServiceData
    ])) as ISupportedServices[]
    console.log(data)
    return data
  },
  component: Component
})

const createDefaultValues = <T extends ISupportedServices[]>(arr: T, defaultValue: boolean) => {
  const temp = {} as Record<ISupportedServices, boolean>

  if (!arr.length) return temp

  for (const service of arr) {
    temp[service] = defaultValue
  }

  return temp
}

function Component() {
  const userServices = useLoaderData({ from: '/app/_menu/home' })
  const { hasSequenceStarted } = useAppSequence()

  const [valuesToBePaid, setToBePaid] = useState(createDefaultValues(userServices, false))
  const [valuesToInvalidate, setInvalidation] = useState(createDefaultValues(userServices, false))

  const hasServices = useMemo(() => Object.keys(valuesToBePaid).length > 0, [userServices])
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
    const servicesToCheck = Object.entries(valuesToBePaid)
      .filter(([_, toCheck]) => toCheck)
      .map(([service]) => service)
    await window.api.startVerificationSequence(servicesToCheck)
  }

  return (
    <div className="space-y-2">
      <p>
        <FormattedMessage id="page.app.tab.home.description" />
      </p>
      <Button
        onClick={handleSequence}
        disabled={hasSequenceStarted || !hasServices || noSelectedServices}
      >
        <FormattedMessage id="page.app.tab.home.init" />
      </Button>
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
          <Link to="/app/services" className="underline underline-offset-4 text-primary">
            <FormattedMessage id="page.app.tab.services.title" />
          </Link>
          .
        </p>
      )}
    </div>
  )
}
