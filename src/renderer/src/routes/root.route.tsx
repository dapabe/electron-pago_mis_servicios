import { IpcEvent } from '#shared/constants/ipc-events'
import { useQuery } from '@tanstack/react-query'
import { IntlProvider } from 'react-intl'
import { Outlet } from 'react-router-dom'
import { WindowBody } from './-components/WindowBody'
import { useIpcListener } from '#renderer/hooks/useIpcListener.hook'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { IAppInformation } from '#shared/types/readonly-data'
import { useAppDataStore } from '#renderer/stores/app-data.store'

export const RootRoute = () => {
  const { data: appInfo, isSuccess: isSuc1 } = useQuery({
    queryKey: [IpcEvent.Integrity.Initialize],
    queryFn: window.api.integrityInitialize
    // staleTime: Infinity
  })
  const { data: translations, isSuccess: isSuc2 } = useQuery({
    queryKey: [IpcEvent.Language.Messages],
    queryFn: window.api.getTranslation,
    enabled: !!appInfo
  })
  // const appStore = useAppDataStore()
  // const userStore = useUserDataStore()
  const { setAppInfo } = useAppDataStore()

  // const [languageMessages, setMessages] = useState<IpcEventReturnType['LanguageChange']>({})
  // const [preferredLocale, setPreferred] = useState<string>('es')

  // useIpcListener(
  //   IpcEvent.Config.InitialConfig,
  //   (_, values: IpcEventReturnType['Config']['InitialConfig']) => {
  //     userStore.setConfig(values.config)
  //     appStore.setVersion(values.appVersion)
  //     appStore.setLocales(values.locales)
  //     setPreferred(values.preferredLocale)
  //   }
  // )

  useIpcListener(IpcEvent.App.Info, (_, value: IpcResponse<IAppInformation>) => {
    setAppInfo(value.data)
  })

  if (!isSuc1 || !isSuc2) return null
  return (
    <IntlProvider
      locale={appInfo.data.preferredLocale}
      defaultLocale="es"
      messages={translations.data}
      onError={() => undefined}
    >
      <WindowBody>
        <Outlet />
      </WindowBody>
    </IntlProvider>
  )
}
