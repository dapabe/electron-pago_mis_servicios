import { IpcEvent } from '#shared/constants/ipc-events'
import { useQuery } from '@tanstack/react-query'
import { IntlProvider } from 'react-intl'
import { Outlet } from 'react-router-dom'
import { WindowBody } from './-components/WindowBody'

export const RootRoute = () => {
  const { data: appInfo, isSuccess: isSuc1 } = useQuery({
    queryKey: [IpcEvent.Integrity.Initialize],
    queryFn: window.api.integrityInitialize
  })
  const { data: translations, isSuccess: isSuc2 } = useQuery({
    queryKey: [IpcEvent.Language.Messages],
    queryFn: window.api.getTranslation,
    enabled: !!appInfo
  })
  // const appStore = useAppDataStore()
  // const userStore = useUserDataStore()

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

  // useIpcListener(
  //   IpcEvent.LanguageChange.Receive,
  //   (_, value: IpcEventReturnType['LanguageChange']) => {
  //     setMessages(value)
  //   }
  // )

  if (!isSuc1 || !isSuc2) return null

  return (
    <IntlProvider
      // locale={preferredLocale}
      locale={appInfo[1].preferredLocale}
      defaultLocale="es"
      messages={translations[1]}
      onError={() => undefined}
    >
      <WindowBody>
        <Outlet />
      </WindowBody>
    </IntlProvider>
  )
}
