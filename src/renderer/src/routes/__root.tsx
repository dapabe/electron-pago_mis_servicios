import { IpcEvent } from '#shared/constants/ipc-events'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { WindowBody } from './-components/WindowBody'
import { createRootRouteWithContext, Outlet, useLoaderData } from '@tanstack/react-router'
import { queryClient } from '#renderer/common/query-client'
import { AppIntlSchema, IAppIntl } from '#shared/schemas/intl.schema'
import { IpcResponseResult } from '#shared/utilities/IpcResponse'
import { ZodError } from 'zod'
import React, { Suspense, useEffect } from 'react'
import { getDefaultsForSchema } from 'zod-defaults'

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
  beforeLoad: async (ctx) => {
    /**
     *  Application important info
     */
    await ctx.context.queryClient.prefetchQuery({
      queryKey: [IpcEvent.App.Info],
      queryFn: async () => await window.electron.ipcRenderer.invoke(IpcEvent.App.Info),
      staleTime: Infinity
    })
  },
  loader: async (ctx) => {
    /**
     *  On start app information
     */
    const {
      data: { preferredLocale }
    } = await ctx.context.queryClient.fetchQuery({
      queryKey: [IpcEvent.Integrity.Initialize],
      queryFn: async () => await window.api.integrityInitialize()
    })

    /**
     *  I18n messages
     */
    const translations = await ctx.context.queryClient.fetchQuery({
      queryKey: [IpcEvent.Language.Messages],
      queryFn: async () => {
        const res = (await window.electron.ipcRenderer.invoke(
          IpcEvent.Language.Messages,
          preferredLocale
        )) as IpcResponseResult<IAppIntl | ZodError<IAppIntl>>
        if (res.data instanceof ZodError) return getDefaultsForSchema(AppIntlSchema)
        return res.data
      }
    })

    return { translations, preferredLocale }
  },
  component: Component,
  notFoundComponent: () => {
    return <p>Not found</p>
  },
  errorComponent: (ctx) => <div className="h-screen bg-white">{JSON.stringify(ctx.error)}</div>
})

function Component() {
  const { preferredLocale, translations } = useLoaderData({ from: '__root__' })
  useEffect(() => {
    document.title = translations.appTitle
    return () => {
      document.title = ''
    }
  }, [preferredLocale])

  return (
    <IntlProvider
      locale={preferredLocale}
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
