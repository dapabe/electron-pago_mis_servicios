import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { Menu } from '../../-components/Menu'
import { useUserDataStore } from '#renderer/stores/user-data.store'

export const NavBar = (): JSX.Element => {
  const { data, toggleFlag } = useUserDataStore()
  // const { sequenceDisabled } = useAppSequence()
  const nav = useNavigate()

  return (
    <Menu isBar className={'can-hover border-b-[1px] border-b-black'}>
      <Menu.Item type="option" onClick={() => nav('/')}>
        <FormattedMessage id="root.navBar.home.title" />
      </Menu.Item>
      <Menu.Item type="menu">
        <FormattedMessage id="root.navBar.settings.title" />
        <Menu className="w-max">
          {/* <Menu.Item
            type="checkbox"
            isChecked={data?.flags.secure ?? true}
            onChange={async () => await toggleFlag('secure')}
          >
            <div className="flex gap-x-2">
              <div>
                <FormattedMessage id={`flags.secure.text`} />
              </div>
              <div className="text-gray-500 flex-grow text-right">
                <FormattedMessage id={`flags.secure.label`} />
              </div>
            </div>
          </Menu.Item> */}
          {/* {Object.entries(data?.flags ?? {}).map(([name, value], idx) => (
            <Menu.Item
              key={name}
              type="checkbox"
              isChecked={name === 'headless' ? !value : value}
              onChange={async () => await toggleFlag(name as keyof IFlagConfig)}
              isDivider={Object.keys(data?.flags ?? {}).length === 1 + idx}
              // isDisabled={name === 'headless' && !sequenceDisabled}
              isDisabled={name === 'headless'}
            >
              <div className="flex gap-x-2">
                <div>
                  <FormattedMessage id={`flags.${name}.text`} />
                </div>
                <div className="text-gray-500 flex-grow text-right">
                  {name === 'headless' ? 'WIP' : <FormattedMessage id={`flags.${name}.label`} />}
                </div>
              </div>
            </Menu.Item>
          ))} */}
        </Menu>
      </Menu.Item>
      <Menu.Item type="option" onClick={() => nav('/help')}>
        <FormattedMessage id="root.navBar.help.title" />
      </Menu.Item>
    </Menu>
  )
}
