import { useIntl } from 'react-intl'
import { AppSequenceProvider } from '#renderer/contexts/app-sequence.ctx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authenticated/home/')({
  component: Component
})

function Component() {
  const intl = useIntl()

  return (
    <AppSequenceProvider>
      {/* <TabPanel
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
      /> */}
    </AppSequenceProvider>
  )
}
