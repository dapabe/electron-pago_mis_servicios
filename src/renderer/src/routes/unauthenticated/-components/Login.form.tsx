import {
  IIpcIntegrityLogin,
  IpcIntegrityLoginSchema
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { twJoin } from 'tailwind-merge'

type ILoginProps = {
  values: IIpcIntegrityLogin
  onSubmit: (data: IIpcIntegrityLogin) => Promise<void>
}

export const LoginForm = ({ values, onSubmit }: ILoginProps) => {
  const { register, handleSubmit } = useForm<IIpcIntegrityLogin>({
    values,
    resolver: zodResolver(IpcIntegrityLoginSchema)
  })

  return (
    <form className="grid grid-cols-4 grid-rows-2 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-2">
        <label htmlFor={register('password').name}>
          <FormattedMessage id="common.form.password" />
        </label>
        <input type="password" {...register('password')} className="text-ellipsis" />
      </div>
      <div className="col-span-2 my-auto">
        <input type="checkbox" />
        <label htmlFor={register('skipServer').name}>
          <FormattedMessage id="page.unauthorized.register.skip-server" />
        </label>
      </div>
      <button
        type="submit"
        className={twJoin('col-start-3 row-start-1 row-end-4 col-span-2 p-2 m-auto')}
      >
        <FormattedMessage id="page.unauthorized.register.submit" />
      </button>
    </form>
  )
}
