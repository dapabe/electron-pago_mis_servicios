import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

export const NavBar = (): JSX.Element => {
  const nav = useNavigate()
  return (
    <ul role="menubar" className="border-b-[1px] border-b-black">
      <li role="menuitem" tabIndex={0} onClick={() => nav('/')}>
        <FormattedMessage id="root.page.home.title" />
      </li>
      <li role="menuitem" tabIndex={0} onClick={() => nav('/settings')}>
        <FormattedMessage id="root.page.settings.title" />
      </li>
      <li role="menuitem" tabIndex={0} onClick={() => nav('/about')}>
        <FormattedMessage id="root.page.about.title" />
      </li>
    </ul>
  )
}
