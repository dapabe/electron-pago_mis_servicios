import { useAppDataStore } from '#renderer/stores/app-data.store'
import { useUserDataStore } from '#renderer/stores/user-data.store'
import { IpcEventReturnType } from '#shared/types/ipc-returnTypes'
import { useState } from 'react'
import { IntlProvider } from 'react-intl'
import { LoaderFunction, Navigate } from 'react-router-dom'

export const RootRoute = (): JSX.Element => {
  const appStore = useAppDataStore()
  const userStore = useUserDataStore()

  const [languageMessages, setMessages] = useState<IpcEventReturnType['LanguageChange']>({})
  const [preferredLocale, setPreferred] = useState<string>('es')

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

  return (
    <IntlProvider
      locale={preferredLocale}
      defaultLocale="es"
      messages={languageMessages}
      onError={undefined}
    >
      <Navigate to={'/app'} />
    </IntlProvider>
  )
}

const loader: LoaderFunction = async () => {
  // window.electron.ipcRenderer.send(IpcEvent.Config.InitialConfig)
  // window.electron.ipcRenderer.send(IpcEvent.LanguageChange.Send)
  return null
}

RootRoute.loader = loader
