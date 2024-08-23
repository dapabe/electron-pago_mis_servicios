import {
  IIpcIntegrityRegister,
  IpcIntegrityRegisterSchema
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { twJoin } from 'tailwind-merge'

type IRegisterProps = {
  values: IIpcIntegrityRegister
  onSubmit: (data: IIpcIntegrityRegister) => Promise<void>
}

export const RegisterForm = ({ values, onSubmit }: IRegisterProps) => {
  const { register, handleSubmit } = useForm<IIpcIntegrityRegister>({
    values,
    resolver: zodResolver(IpcIntegrityRegisterSchema)
  })

  return (
    <form className="grid grid-cols-5 grid-rows-3 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-3">
        <label htmlFor={register('databaseFilePath').name}>
          <FormattedMessage id="page.unauthorized.register.db-file-path" />
        </label>
        <div className="searchbox">
          <input
            type="search"
            {...register('databaseFilePath')}
            aria-disabled="true"
            disabled
            placeholder="C:\"
            className="text-gray-500 text-ellipsis"
          />
          <button aria-label="search" className="mr-auto"></button>
        </div>
      </div>
      <div className="col-span-2">
        <input type="checkbox" {...register('skipServer')} />
        <label htmlFor={register('skipServer').name}>
          <FormattedMessage id="page.unauthorized.register.skip-server" />
        </label>
      </div>
      <div className="col-span-3">
        <label htmlFor={register('password').name}>
          <FormattedMessage id="common.form.password" />
        </label>
        <input type="password" {...register('password')} className="text-ellipsis" />
      </div>
      <div className="col-span-3">
        <label htmlFor={register('repeatPassword').name}>
          <FormattedMessage id="common.form.password-repeat" />
        </label>
        <input type="password" {...register('repeatPassword')} className="text-ellipsis" />
      </div>
      <button
        type="submit"
        className={twJoin('col-start-4 row-start-2 row-end-4 col-span-2 p-2 m-auto')}
      >
        <FormattedMessage id="page.unauthorized.register.submit" />
      </button>
    </form>
  )
}
