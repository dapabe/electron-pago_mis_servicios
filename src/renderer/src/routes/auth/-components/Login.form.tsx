import {
  IIpcIntegrityLogin,
  IpcIntegrityLoginSchema
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { getDefaultsForSchema } from 'zod-defaults'
import { IDefaultValues } from '#renderer/common/types/form.props'
import { Input } from '#renderer/shadcn/ui/input'
import { Button } from '#renderer/shadcn/ui/button'
import { LoaderCircle } from 'lucide-react'
import { Form, FormControl, FormField, FormItem } from '#renderer/shadcn/ui/form'
import { Label } from '#renderer/shadcn/ui/label'

export const LoginForm = ({ values }: IDefaultValues<IIpcIntegrityLogin>) => {
  const form = useForm<IIpcIntegrityLogin>({
    values: Object.assign(getDefaultsForSchema(IpcIntegrityLoginSchema), values),
    resolver: zodResolver(IpcIntegrityLoginSchema)
  })

  const nav = useNavigate()
  const mutation = useMutation<void, void, IIpcIntegrityLogin>({
    mutationFn: async (data) => {
      const res = await window.api.appLogin(data)
      if (typeof res.data === 'string') await nav({ to: '/app' })
    }
  })

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 grid-rows-2 gap-2"
        onSubmit={form.handleSubmit((x) => mutation.mutateAsync(x))}
      >
        <div className="col-span-3 flex items-center gap-x-2">
          <Label htmlFor={'password'}>
            <FormattedMessage id="common.form.password" />
          </Label>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" className="text-ellipsis" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <span className="text-red-500 mx-auto">
            <FormattedMessage id={form.formState.errors.password?.message ?? ' '} />
          </span>
        </div>
        <div className="col-span-2 flex items-center">
          <Link className="underline cursor-pointer" to="/auth/forgot">
            <FormattedMessage id="common.form.password-forget" />
          </Link>
        </div>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={'row-start-3 col-start-3 col-end-4 w-full p-2 rounded'}
        >
          {form.formState.isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <FormattedMessage id="page.auth.submit" />
          )}
        </Button>
      </form>
    </Form>
  )
}
