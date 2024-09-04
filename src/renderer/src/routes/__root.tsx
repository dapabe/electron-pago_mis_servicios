import { IpcEvent } from '#shared/constants/ipc-events'
import { useQuery } from '@tanstack/react-query'
import { IntlProvider } from 'react-intl'
import { WindowBody } from './-components/WindowBody'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { queryClient } from '#renderer/common/query-client'
import { useRef } from 'react'
import { IAppIntl } from '#shared/schemas/intl.schema'
import { IpcResponseResult } from '#shared/utilities/IpcResponse'
import { ZodError } from 'zod'
import { useIpcListenerOnce } from '#renderer/hooks/useIpcListenerOnce.hook'

export const Route = createRootRouteWithContext<{
  queryClient: typeof queryClient
}>()({
  component: Component,
  notFoundComponent: () => {
    return <p>Not found</p>
  }
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

  const translations = useRef<Partial<IAppIntl>>({})
  useIpcListenerOnce(
    IpcEvent.Language.Messages,
    (_, ipcResponse: IpcResponseResult<Partial<IAppIntl> | ZodError<IAppIntl>>) => {
      if (ipcResponse.data instanceof ZodError) translations.current = {}
      else translations.current = ipcResponse.data
    }
  )

  if (!isSuc1) return null
  return (
    <IntlProvider
      locale={initInfo.data.preferredLocale}
      defaultLocale="es"
      messages={translations.current}
      onError={() => undefined}
    >
      <WindowBody>
        <Outlet />
      </WindowBody>
    </IntlProvider>
  )
}
