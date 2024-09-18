import { IpcEvent } from '#shared/constants/ipc-events'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod'

export const Route = createFileRoute('/app/')({
  beforeLoad: async (ctx) => {
    const isAuth = ctx.context.queryClient.getQueryData([IpcEvent.Db.isAuthenticated]) as boolean
    if (isAuth) throw redirect({ to: '/app/home' })
    else {
      await ctx.context.queryClient.prefetchQuery({
        queryKey: [IpcEvent.Db.CRUD.Read.ServiceData],
        queryFn: async () => {
          const { data, status } = await window.api.CRUD.ServiceData.read()
          if (status === StatusCodes.INTERNAL_SERVER_ERROR || data instanceof ZodError) {
            console.error(data)
            return []
          }
          return data.map((x) => x.serviceName)
        }
      })

      throw redirect({ to: '/auth/login' })
    }
  }
})
