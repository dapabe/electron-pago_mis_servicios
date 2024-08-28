import { useTabPanel } from '#renderer/hooks/useTabPanel.hook'
import { InputText } from '#renderer/routes/-components/form/InputText'
import {
  IIpcIntegrityRegister,
  IpcIntegrityRegisterSchema
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { twJoin } from 'tailwind-merge'
import { ZodError } from 'zod'

type IRegisterProps = {
  values: IIpcIntegrityRegister
}

export const RegisterForm = ({ values }: IRegisterProps) => {
  const tabPanel = useTabPanel()
  const { register, handleSubmit, getValues, setValue, control, formState } =
    useForm<IIpcIntegrityRegister>({
      values,
      resolver: zodResolver(IpcIntegrityRegisterSchema)
    })

  const mutation = useMutation({
    mutationFn: async () => {
      const err = await window.api.appRegister(getValues())

      if (!(err.data instanceof ZodError)) tabPanel.goToTab(1)
    }
  })

  const handleDbSelection = async () => {
    const res = await window.api.selectDatabase(getValues().databaseFilePath)
    if (res) setValue('databaseFilePath', res)
  }

  return (
    <form
      className="grid grid-cols-6 grid-rows-3 w-full gap-2"
      onSubmit={handleSubmit(async () => await mutation.mutateAsync())}
    >
      <div className="col-span-full flex flex-col">
        <label htmlFor={register('databaseFilePath').name}>
          <FormattedMessage id="page.unauthorized.register.db-file-path" />
        </label>
        <div className="searchbox" title={getValues('databaseFilePath')}>
          <input
            type="search"
            {...register('databaseFilePath')}
            aria-disabled="true"
            disabled
            placeholder="C:\"
            className="text-gray-500 text-ellipsis w-full cursor-help"
          />
          <button aria-label="search" tabIndex={-1} onClick={handleDbSelection}></button>
        </div>
      </div>
      <div className="col-span-3 flex flex-col">
        <label htmlFor={register('password').name}>
          <FormattedMessage id="common.form.password" />
        </label>
        <InputText
          control={control}
          name="password"
          type="password"
          isInvalid={Object.hasOwn(formState.errors, 'samePassword')}
          className="text-ellipsis"
        />
        <span className="text-red-500">
          <FormattedMessage id={formState.errors.password?.message ?? ' '} />
        </span>
      </div>
      <div className="col-span-3 flex flex-col">
        <label htmlFor={register('repeatPassword').name}>
          <FormattedMessage id="common.form.password-repeat" />
        </label>
        <InputText
          control={control}
          name="repeatPassword"
          type="password"
          isInvalid={Object.hasOwn(formState.errors, 'samePassword')}
          className="text-ellipsis"
        />
        <span className="text-red-500">
          <FormattedMessage id={formState.errors.repeatPassword?.message ?? ' '} />
        </span>
      </div>
      <div className="col-span-3 flex">
        <div className="text-red-500 my-auto">
          <FormattedMessage
            id={
              // @ts-ignore
              formState.errors.samePassword?.message ?? ' '
            }
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={formState.isSubmitting}
        className={twJoin('col-span-3 size-max p-2 ml-auto')}
      >
        <FormattedMessage
          id="page.unauthorized.register.submit"
          values={{
            isSubmitting: formState.isSubmitting
          }}
        />
      </button>
    </form>
  )
}
