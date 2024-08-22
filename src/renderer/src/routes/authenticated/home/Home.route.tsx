import { useIntl } from 'react-intl'
import { TabPanel } from '../-components/TabPanel'
import { PayMethods } from './-components/sequence/PayMethods'
import { ServiceAccounts } from './-components/sequence/tab-services/ServiceAccounts'
import { VerificationPhase } from './-components/sequence/VerificationPhase'
import { AppSequenceProvider } from '#renderer/contexts/app-sequence.ctx'

export const HomeRoute = (): JSX.Element => {
  const intl = useIntl()

  return (
    <AppSequenceProvider>
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
          }
        ]}
      />
    </AppSequenceProvider>
  )
}
