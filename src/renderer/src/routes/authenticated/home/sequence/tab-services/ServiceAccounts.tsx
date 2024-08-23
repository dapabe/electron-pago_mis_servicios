import { TabPanel } from '#renderer/routes/-components/TabPanel'
import { Fragment } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { ServiceEditForm } from './Service-Edit.form'

export const ServiceAccounts = () => {
  // const { data } = useUserDataStore()
  const intl = useIntl()
  return (
    <section className="space-y-2">
      <p>
        <FormattedMessage id="page.home.tab.services.description" />
      </p>
      <TabPanel
        tabs={[
          {
            title: intl.formatMessage({ id: 'page.home.tab.services.tab.add' }),
            body: (
              <Fragment>
                {/* <ServiceLoginFieldForm />
                <ServiceListForm /> */}
              </Fragment>
            )
          },
          {
            title: intl.formatMessage({ id: 'page.home.tab.services.tab.edit' }, { amount: 1 }),
            body: <ServiceEditForm />
          }
        ]}
      />
    </section>
  )
}
