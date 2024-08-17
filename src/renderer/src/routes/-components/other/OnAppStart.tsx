import { useAppDataStore } from '#renderer/stores/app-data.store'
import { IpcEvent } from '#shared/ipc-events'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

export const OnAppStart = () => {
  const { setVersion } = useAppDataStore()
  const intl = useIntl()
  useEffect(() => {
    document.title = intl.formatMessage({ id: 'appTitle' })
  }, [intl.locale])

  useEffect(() => {
    window.electron.ipcRenderer.once(IpcEvent.AppVersion, (_, msg) => {
      setVersion(msg)
    })
  }, [])

  return null
}
