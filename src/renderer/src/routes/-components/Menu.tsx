import { PropsWithChildren, useId } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

type Props = PropsWithChildren<{
  /** role="menubar" */
  isBar?: boolean | null
  isHidden?: boolean
  className?: string
}>
export function Menu({ children, isHidden, isBar, className }: Props) {
  return (
    <ul
      {...(isBar === null ? undefined : { role: isBar ? 'menubar' : 'menu' })}
      className={twMerge('select-none', className)}
      hidden={isHidden}
    >
      {children}
    </ul>
  )
}

type MinimalItemProps = PropsWithChildren<{
  isDisabled?: boolean
  isDivider?: boolean
}>

type IMenuItemProps =
  | (MinimalItemProps & {
      type: 'option' | 'menu'
      onClick?: () => void
    })
  | (MinimalItemProps & {
      type: 'checkbox'
      /** @default "checkbox" */
      inputType?: 'radio' | 'checkbox'
      isChecked: boolean
      onChange: (value: boolean) => void
    })

const MenuItem = ({ children, ...props }: IMenuItemProps) => {
  if (props.type === 'checkbox') {
    const id = useId() + 'li'
    return (
      <li
        role="menuitem"
        tabIndex={0}
        className={twJoin('cursor-pointer', props.isDivider && 'has-divider')}
        {...(props.isDisabled ? { 'aria-disabled': 'true' } : undefined)}
      >
        <input
          id={id}
          type={props.inputType ?? 'checkbox'}
          {...(props.inputType === 'radio' ? { name: 'icon-size' } : undefined)}
          checked={props.isChecked}
          onChange={(evt) => props.onChange(evt.currentTarget.checked)}
        />
        <label htmlFor={id}>{children}</label>
      </li>
    )
  }
  if (props.type === 'option') {
    return (
      <li
        role="menuitem"
        tabIndex={0}
        className={twJoin(props.isDivider && 'has-divider')}
        onClick={props.onClick}
        {...(props.isDisabled ? { 'aria-disabled': 'true' } : undefined)}
      >
        {children}
      </li>
    )
  }

  return (
    <li
      role="menuitem"
      tabIndex={0}
      aria-haspopup={'true'}
      className={twJoin(props.isDivider && 'has-divider')}
      onClick={props.onClick}
      {...(props.isDisabled ? { 'aria-disabled': 'true' } : undefined)}
    >
      {children}
    </li>
  )
}

Menu.Item = MenuItem
