import { IpcEvent } from '#shared/constants/ipc-events'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async (ctx) => {
    const isAuth = await ctx.context.queryClient.fetchQuery({
      queryKey: [IpcEvent.Db.isAuthenticated],
      queryFn: async () =>
        (await window.electron.ipcRenderer.invoke(IpcEvent.Db.isAuthenticated)) as Promise<boolean>
    })
    if (isAuth) throw redirect({ replace: true, to: '/app' })
    else throw redirect({ replace: true, to: '/auth' })
  }
})
