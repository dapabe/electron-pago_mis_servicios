import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { Menu } from './Menu'
import { useUserDataStore } from '@renderer/stores/user-data.store'
import { IFlagConfig } from '@renderer/common/schemas/flags.schema'

export const NavBar = (): JSX.Element => {
  const { flags, toggleFlag } = useUserDataStore()
  const nav = useNavigate()
  return (
    <Menu isBar className={'can-hover border-b-[1px] border-b-black'}>
      <Menu.Item type="option" onClick={() => nav('/')}>
        <FormattedMessage id="root.navBar.home.title" />
      </Menu.Item>
      <Menu.Item type="menu">
        <FormattedMessage id="root.navBar.settings.title" />
        <Menu className="w-max">
          {Object.entries(flags!).map(([name, value], idx) => (
            <Menu.Item
              key={name}
              type="checkbox"
              isChecked={value}
              onChange={() => toggleFlag(name as keyof IFlagConfig)}
              isDivider={Object.keys(flags!).length === 1 + idx}
            >
              <div className="flex gap-x-2">
                <div>
                  <FormattedMessage id={`flags.${name}.text`} />
                </div>
                <div className="text-gray-500 flex-grow text-right">
                  <FormattedMessage id={`flags.${name}.label`} />
                </div>
              </div>
            </Menu.Item>
          ))}
        </Menu>
      </Menu.Item>
      <Menu.Item type="option" onClick={() => nav('/about')}>
        <FormattedMessage id="root.navBar.help.title" />
      </Menu.Item>
    </Menu>
  )
}
