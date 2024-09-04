import { IpcEvent } from '#shared/constants/ipc-events'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout')({
  beforeLoad: async (ctx) => {
    const isAuth = await ctx.context.queryClient.getQueryData([IpcEvent.Db.isAuthenticated])
    if (isAuth) throw redirect({ replace: true, to: '/app' })
  },
  component: () => <Outlet />
})
