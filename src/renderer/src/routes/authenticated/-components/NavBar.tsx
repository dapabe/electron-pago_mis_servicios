import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { Menu } from '#renderer/routes/-components/Menu'

export const NavBar = (): JSX.Element => {
  // const { data, toggleFlag } = useUserDataStore()
  // const { sequenceDisabled } = useAppSequence()
  const nav = useNavigate()

  return (
    <Menu isBar className={'can-hover border-b-[1px] border-b-black'}>
      <Menu.Item type="option" onClick={() => nav('/app')}>
        <FormattedMessage id="root.navBar.home.title" />
      </Menu.Item>
      <Menu.Item type="option" onClick={() => nav('/app/settings')}>
        <FormattedMessage id="root.navBar.settings.title" />
      </Menu.Item>
    </Menu>
  )
}
