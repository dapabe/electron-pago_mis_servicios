import { ChangeEventHandler, PropsWithChildren, useId } from 'react'

type Props = PropsWithChildren & {
  name: string
  isChecked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}
export const CheckBox = ({ isChecked, name, onChange, children }: Props): JSX.Element => {
  const id = useId() + 'cb'

  return (
    <>
      <div className="field-row">
        <input
          checked={isChecked}
          type="checkbox"
          id={id}
          aria-describedby={id}
          name={name}
          onChange={onChange}
        />
        <label htmlFor={id}>{children}</label>
      </div>
    </>
  )
}
