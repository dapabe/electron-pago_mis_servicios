import { IpcEvent } from '#shared/constants/ipc-events'
import { useQuery } from '@tanstack/react-query'
import { IntlProvider } from 'react-intl'
import { Outlet } from 'react-router-dom'
import { WindowBody } from './-components/WindowBody'
import { ZodError } from 'zod'

export const RootRoute = () => {
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
  const { data: translations, isSuccess: isSuc2 } = useQuery({
    queryKey: [IpcEvent.Language.Messages],
    queryFn: async () => {
      const res = await window.api.getTranslation()
      if (res.data instanceof ZodError) return {}
      return res.data
    },
    enabled: !!initInfo
  })

  if (!isSuc1 || !isSuc2) return null
  return (
    <IntlProvider
      locale={initInfo.data.preferredLocale}
      defaultLocale="es"
      messages={translations}
      onError={() => undefined}
    >
      <WindowBody>
        <Outlet />
      </WindowBody>
    </IntlProvider>
  )
}
