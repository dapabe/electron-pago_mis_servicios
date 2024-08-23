import { IpcEvent } from '#shared/constants/ipc-events'
import {
  IIpcIntegrityInitialize,
  IIpcIntegrityLogin,
  IpcIntegrityLoginSchema
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { useQueryClient } from '@tanstack/react-query'
import { FormattedMessage } from 'react-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { twJoin } from 'tailwind-merge'

export const UnauthenticatedRoute = () => {
  const query = useQueryClient().getQueryData([
    IpcEvent.Integrity.Initialize
  ]) as IpcResponse<IIpcIntegrityInitialize>

  const { register, handleSubmit } = useForm<IIpcIntegrityLogin>({
    values: {
      databaseFilePath: query.data.databaseFilePath,
      skipServer: query.data.skipServer,
      password: '',
      repeatPassword: ''
    },
    resolver: zodResolver(IpcIntegrityLoginSchema)
  })

  const submitForm = (d: IIpcIntegrityLogin) => {
    console.log(d)
  }

  return (
    <form className="flex justify-center items-center h-full" onSubmit={handleSubmit(submitForm)}>
      <div className="window w-3/4">
        <div className="title-bar">
          <div className="title-bar-text mx-auto select-none">
            <FormattedMessage
              id={`page.unauthorized.register.${query.data.hasDB ? 'has-db' : 'no-db'}`}
            />
          </div>
        </div>
        <div className="window-body p-2">
          <div className="grid grid-cols-5 grid-rows-3 w-full">
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
          </div>
        </div>
      </div>
    </form>
  )
}
