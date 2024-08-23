import { useIntl } from 'react-intl'
import { PayMethods } from './sequence/PayMethods'
import { ServiceAccounts } from './sequence/tab-services/ServiceAccounts'
import { AppSequenceProvider } from '#renderer/contexts/app-sequence.ctx'
import { TabPanel } from '#renderer/routes/-components/TabPanel'

export const HomeRoute = (): JSX.Element => {
  const intl = useIntl()

  return (
    <AppSequenceProvider>
      <TabPanel
        label="Secuencía"
        tabs={[
          {
            title: intl.formatMessage({ id: 'page.home.tab.verify.title' }),
            body: null
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
