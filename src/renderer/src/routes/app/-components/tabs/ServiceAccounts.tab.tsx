import { FormattedMessage, useIntl } from 'react-intl'

export const ServiceAccountsTab = () => {
  // const { data } = useUserDataStore()
  const intl = useIntl()
  return (
    <section className="space-y-2">
      <p>
        <FormattedMessage id="page.app.tab.services.description" />
      </p>
    </section>
  )
}

{
  /* <TabPanel
tabs={[
  {
    title: intl.formatMessage({ id: 'page.home.tab.services.tab.add' }),
    body: (

        {/* <ServiceLoginFieldForm />
        <ServiceListForm /> */
}

//   {
//     title: intl.formatMessage({ id: 'page.home.tab.services.tab.edit' }, { amount: 1 }),
//     body: <ServiceEditForm />
//   }
// ]} /> */}
