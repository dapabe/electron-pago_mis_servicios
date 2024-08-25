import { InputText } from '#renderer/routes/-components/form/InputText'
import { IpcEvent } from '#shared/constants/ipc-events'
import {
  IIpcIntegrityLogin,
  IpcIntegrityLoginSchema
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { twJoin } from 'tailwind-merge'

type ILoginProps = {
  skipServer: boolean
  values: IIpcIntegrityLogin
}

export const LoginForm = ({ values, skipServer }: ILoginProps) => {
  const d = useQuery({
    queryKey: [IpcEvent.Db.Login]
  })

  const { control, handleSubmit, formState } = useForm<IIpcIntegrityLogin>({
    values,
    resolver: zodResolver(IpcIntegrityLoginSchema)
  })

  const handleLogin = async (data: IIpcIntegrityLogin) => {}

  const handlePasswordForget = async () => {}

  return (
    <form className="grid grid-cols-3 grid-rows-2 gap-2" onSubmit={handleSubmit(handleLogin)}>
      <div className="col-span-3 flex items-center gap-x-2">
        <label htmlFor={control.register('password').name}>
          <FormattedMessage id="common.form.password" />
        </label>
        <InputText control={control} type="password" name={'password'} className="text-ellipsis" />
        <span className="text-red-500 mx-auto">
          <FormattedMessage id={formState.errors.password?.message ?? ' '} />
        </span>
      </div>
      <div className="col-span-2 flex items-center">
        <a className="underline cursor-pointer" onClick={handlePasswordForget}>
          <FormattedMessage id="common.form.password-forget" />
        </a>
      </div>
      <button type="submit" className={twJoin('col-start-3 p-2 w-max ml-auto')}>
        <FormattedMessage id="page.unauthorized.register.submit" />
      </button>
    </form>
  )
}
