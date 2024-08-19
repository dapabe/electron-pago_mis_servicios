import { useIntl } from 'react-intl'
import { TabPanel } from '../-components/TabPanel'
import { PayMethods } from './-components/sequence/PayMethods'
import { ServiceAccounts } from './-components/sequence/ServiceAccounts'
import { VerificationPhase } from './-components/sequence/VerificationPhase'
import { ToBePaidStep } from './-components/sequence/ToBePaidStep'
import { useAppSequence } from '#renderer/hooks/useAppSequence.hook'

export const HomeRoute = (): JSX.Element => {
  const { sequenceDisabled } = useAppSequence()
  const intl = useIntl()

  return (
    <TabPanel
      label="Secuencía"
      tabs={[
        {
          title: intl.formatMessage({ id: 'page.home.tab.verify.title' }),
          body: <VerificationPhase />
        },
        {
          title: intl.formatMessage({ id: 'page.home.tab.services.title' }),
          body: <ServiceAccounts />
        },
        {
          title: intl.formatMessage({ id: 'page.home.tab.payMethods.title' }),
          body: <PayMethods />
        },
        {
          title: intl.formatMessage({ id: 'page.home.tab.toBePaid.title' }),
          isDisabled: sequenceDisabled,
          body: <ToBePaidStep />
        }
      ]}
    />
  )
}
