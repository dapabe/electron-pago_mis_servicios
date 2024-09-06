import { IpcEvent } from '#shared/constants/ipc-events'
import { useQuery } from '@tanstack/react-query'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { WindowBody } from './-components/WindowBody'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { queryClient } from '#renderer/common/query-client'
import { IAppIntl } from '#shared/schemas/intl.schema'
import { IpcResponseResult } from '#shared/utilities/IpcResponse'
import { ZodError } from 'zod'
import React, { Suspense, useEffect } from 'react'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools
        }))
      )
const ReactQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/react-query-devtools').then((res) => ({
          default: res.ReactQueryDevtools
        }))
      )

export const Route = createRootRouteWithContext<{
  queryClient: typeof queryClient
}>()({
  component: Component,
  notFoundComponent: () => {
    return <p>Not found</p>
  },
  errorComponent: (ctx) => <div className="size-full bg-white">{JSON.stringify(ctx.error)}</div>
})

function Component() {
  /**
   *  Application important info
   */
  useQuery({
    queryKey: [IpcEvent.App.Info],
    queryFn: async () => await window.electron.ipcRenderer.invoke(IpcEvent.App.Info),
    staleTime: Infinity
  })

  /**
   *  On start app information
   */
  const { data: initInfo, isSuccess: isSuc1 } = useQuery({
    queryKey: [IpcEvent.Integrity.Initialize],
    queryFn: window.api.integrityInitialize
  })

  /**
   *  I18n messages
   */
  const { data: translations } = useQuery({
    queryKey: [IpcEvent.Language.Messages],
    enabled: !!initInfo?.data.preferredLocale,
    queryFn: async () => {
      const res = (await window.electron.ipcRenderer.invoke(
        IpcEvent.Language.Messages,
        initInfo?.data.preferredLocale
      )) as IpcResponseResult<Partial<IAppIntl> | ZodError<IAppIntl>>
      if (res.data instanceof ZodError) return {}
      return res.data
    }
  })

  useEffect(() => {
    document.title = translations?.appTitle ?? ''
    return () => {
      document.title = ''
    }
  }, [translations])

  if (!isSuc1) return null
  return (
    <IntlProvider
      locale={initInfo.data.preferredLocale}
      defaultLocale="es"
      messages={translations}
      onError={() => undefined}
    >
      <WindowBody title={<FormattedMessage id="appTitle" />}>
        <Outlet />
      </WindowBody>
      <Suspense>
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <TanStackRouterDevtools position="bottom-left" />
      </Suspense>
    </IntlProvider>
  )
}
