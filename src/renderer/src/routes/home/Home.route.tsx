import { useIntl } from 'react-intl'
import { TabPanel } from '../-components/TabPanel'
import { PayMethods } from './-components/PayMethods'
import { ServiceAccounts } from './-components/ServiceAccounts'
import { PaySequence } from './-components/PaySequence'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'

export const HomeRoute = (): JSX.Element => {
  const intl = useIntl()
  const location = useLocation()
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const nav = useNavigate()

  const handleTabState = (title: string) => {
    queryParams.set('tab', title)
    const search = `?${queryParams.toString()}`
    console.log(search)
    nav(`/${search}`)
  }
  console.log(queryParams)

  return (
    <TabPanel
      label="Secuencía"
      selectedTab={queryParams.get('tab')?.split('+').join(' ')}
      beforeChange={handleTabState}
      tabs={[
        {
          title: intl.formatMessage({ id: 'page.home.tab.pay.title' }),
          body: <PaySequence />
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
  )
}
