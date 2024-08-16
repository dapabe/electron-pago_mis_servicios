import { useIntl } from 'react-intl'
import { TabPanel } from '../-components/TabPanel'
import { PayMethods } from './-components/PayMethods'
import { ServiceAccounts } from './-components/ServiceAccounts'
import { PaySequence } from './-components/PaySequence'
import { ToBePaidStep } from './-components/ToBePaidStep'

export const HomeRoute = (): JSX.Element => {
  const intl = useIntl()

  return (
    <TabPanel
      label="Secuencía"
      tabs={[
        {
          title: intl.formatMessage({ id: 'page.home.tab.verify.title' }),
          body: <PaySequence />
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
          isDisabled: true,
          body: <ToBePaidStep />
        }
      ]}
    />
  )
}
