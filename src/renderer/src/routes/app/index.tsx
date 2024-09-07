import { AppSequenceProvider } from '#renderer/contexts/app-sequence.ctx'
import { createFileRoute } from '@tanstack/react-router'
import { FormattedMessage } from 'react-intl'
import { TabPanel } from '../-components/TabPanel'
import * as Icon from 'phosphor-react'
import { HomeTab } from './-components/tabs/Home.tab'
import { SettingsTab } from './-components/tabs/Settings.tab'
import { PayMethodsTab } from './-components/tabs/PayMethods.tab'
import { ServiceAccountsTab } from './-components/tabs/ServiceAccounts.tab'
import { z } from 'zod'

export const Route = createFileRoute('/app/')({
  validateSearch: (sq: Record<string, unknown>) => {
    const sqSchema = z.object({
      page: z.number().positive().optional().catch(1)
    })
    return sqSchema.parse(sq)
  },
  component: Component
})

function Component() {
  return (
    <main>
      <AppSequenceProvider>
        <TabPanel
          initialTab={'0'}
          tabs={[
            {
              title: (
                <>
                  <Icon.ListNumbers size={24} />
                  <FormattedMessage id="page.app.tab.home.title" />
                </>
              ),
              body: <HomeTab />
            },
            {
              title: (
                <>
                  <Icon.IdentificationCard size={24} />
                  <span className="truncate">
                    <FormattedMessage id="page.app.tab.payMethods.title" />
                  </span>
                </>
              ),
              body: <PayMethodsTab />
            },
            {
              title: (
                <>
                  <Icon.UserList size={24} />
                  <FormattedMessage id="page.app.tab.services.title" />
                </>
              ),
              body: <ServiceAccountsTab />
            },
            {
              title: (
                <>
                  <Icon.GearSix size={24} />
                  <FormattedMessage id="page.app.tab.settings.title" />
                </>
              ),
              body: <SettingsTab />
            }
          ]}
        />
      </AppSequenceProvider>
    </main>
  )
}
