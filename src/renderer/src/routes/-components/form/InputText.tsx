import { ReactNode } from '@tanstack/react-router'
import { Button, Input, Label } from 'keep-react'
import { ButtonProps } from 'keep-react/lib/esm/components/Button/Button'
import { HTMLInputTypeAttribute, PropsWithChildren } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { twJoin } from 'tailwind-merge'

type Props<T extends object> = UseControllerProps<T> & {
  isInvalid?: boolean
  label?: ReactNode
  icon?: ReactNode
  placeholder?: string
  type?: Extract<HTMLInputTypeAttribute, 'password' | 'text'>
  className?: string
}
const InputText = <T extends object>({
  type = 'text',
  className,
  isInvalid,
  placeholder,
  label,
  icon,
  ...props
}: Props<T>) => {
  const { field, fieldState, formState } = useController(props)
  return (
    <fieldset className="relative w-full">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        {...field}
        type={type}
        id={field.name}
        placeholder={placeholder}
        className={twJoin(icon ? 'ps-12' : '')}
      />
      {/* <input
      {...field}
      type={type}
      aria-invalid={isInvalid || fieldState.error ? 'true' : undefined}
      className={twMerge(
        'focus-within:aria-[invalid]:border-red-500 aria-[invalid]:border-red-500 aria-disabled:text-gray-500',
        className
      )}
      /> */}
      {icon}
    </fieldset>
  )
}

type IButtonIconProps = Omit<PropsWithChildren<ButtonProps>, 'className'>

InputText.ButtonIcon = ({ children, ...props }: IButtonIconProps) => {
  return (
    <div className="absolute inset-y-0 start-0 flex p-0.5 items-center ps-1 peer-disabled:pointer-events-none peer-disabled:opacity-50">
      <Button variant="link" className="px-1" {...props}>
        {children}
      </Button>
    </div>
  )
}

export { InputText }
