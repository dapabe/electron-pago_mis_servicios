import {
  IIpcIntegrityRegister,
  IpcIntegrityRegisterSchema
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { twJoin } from 'tailwind-merge'
import { ZodError } from 'zod'
import * as Icon from 'lucide-react'
import { getDefaultsForSchema } from 'zod-defaults'
import { IDefaultValues } from '#renderer/common/types/form.props'
import { Input } from '#renderer/shadcn/ui/input'
import { Button } from '#renderer/shadcn/ui/button'

export const RegisterForm = ({ values }: IDefaultValues<IIpcIntegrityRegister>) => {
  // const stepPanel = useStepPanel()
  const intl = useIntl()
  const { register, handleSubmit, getValues, setValue, control, formState } =
    useForm<IIpcIntegrityRegister>({
      values: Object.assign(getDefaultsForSchema(IpcIntegrityRegisterSchema), values),
      resolver: zodResolver(IpcIntegrityRegisterSchema)
    })

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await window.api.appRegister(getValues())

      if (res.data instanceof ZodError) return
      // else stepPanel.goToStep(1)
    }
  })

  const handleDbSelection = async () => {
    const res = await window.api.selectDatabase(getValues().databaseFilePath)
    if (res.data instanceof ZodError)
      setValue('databaseFilePath', formState.defaultValues?.databaseFilePath ?? '')
    else setValue('databaseFilePath', res.data)
  }

  return (
    <form
      className="grid grid-cols-6 grid-rows-3 w-full gap-2"
      onSubmit={handleSubmit(async () => await mutation.mutateAsync())}
    >
      <div className="col-span-full flex flex-col">
        <Input
          name={'databaseFilePath'}
          type="text"
          // label={<FormattedMessage id="page.unauthorized.register.db-file-path" />}

          placeholder={intl.formatMessage({ id: 'page.unauthorized.register.db-file-path' })}
        />
      </div>
      <div className="col-span-3 flex flex-col">
        <label htmlFor={register('password').name}>
          <FormattedMessage id="common.form.password" />
        </label>
        <Input
          name="password"
          type="password"
          aria-invalid={Object.hasOwn(formState.errors, 'samePassword')}
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
        <Input
          name="repeatPassword"
          type="password"
          aria-invalid={Object.hasOwn(formState.errors, 'samePassword')}
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

      <Button
        type="submit"
        disabled={formState.isSubmitting}
        className={twJoin('col-span-3 size-max p-2 ml-auto')}
      >
        {formState.isSubmitting ? (
          <Icon.LoaderCircle />
        ) : (
          <FormattedMessage id="page.auth.submit" />
        )}
      </Button>
    </form>
  )
}
