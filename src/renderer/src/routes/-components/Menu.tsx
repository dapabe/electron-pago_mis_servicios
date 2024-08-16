import { PropsWithChildren, useMemo } from 'react'
import { twJoin } from 'tailwind-merge'

type MenuItemProps = PropsWithChildren & {
  isDisabled?: boolean
  hasMenu?: boolean
  isDivider?: boolean
  items?: MenuItemProps[]
}

type Props = {
  items: MenuItemProps[]
  isHidden?: boolean
}
export function Menu({ items, isHidden }: Props) {
  const someSubMenu = useMemo(() => items.some((x) => Boolean(x.items)), [items])
  return (
    <ul role="menu" className={twJoin('w-max', someSubMenu && 'can-hover')} hidden={isHidden}>
      {items.map(({ items, children, ...others }, idx) => {
        if (items)
          return (
            <Menu.Item key={idx} {...others}>
              {children}
              <Menu items={items} />
            </Menu.Item>
          )
        return (
          <Menu.Item key={idx} {...others}>
            {children}
          </Menu.Item>
        )
      })}
    </ul>
  )
}

const MenuItem = ({ children, isDisabled, hasMenu, isDivider }: MenuItemProps) => {
  return (
    <li
      role="menuitem"
      tabIndex={0}
      aria-haspopup={hasMenu ? 'true' : 'false'}
      aria-disabled={isDisabled ? 'true' : 'false'}
      className={twJoin(isDivider && 'has-divider', !hasMenu && 'pl-8 w-max after:-ml-7')}
    >
      {children}
    </li>
  )
}

Menu.Item = MenuItem
