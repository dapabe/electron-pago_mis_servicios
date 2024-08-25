import { HTMLInputTypeAttribute } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type Props<T extends object> = UseControllerProps<T> & {
  isInvalid?: boolean
  type?: Extract<HTMLInputTypeAttribute, 'password' | 'text'>
  className?: string
}
export const InputText = <T extends object>({
  type = 'text',
  className,
  isInvalid,
  ...props
}: Props<T>) => {
  const { field, fieldState, formState } = useController(props)
  return (
    <input
      {...field}
      type={type}
      aria-invalid={isInvalid || fieldState.error ? 'true' : undefined}
      className={twMerge(
        'focus-within:aria-[invalid]:border-red-500 aria-[invalid]:border-red-500 aria-disabled:text-gray-500',
        className
      )}
    />
  )
}
