import { useIpcListener } from '#renderer/hooks/useIpcListener.hook'
import { useAppDataStore } from '#renderer/stores/app-data.store'
import { useUserDataStore } from '#renderer/stores/user-data.store'
import { IpcEvent } from '#shared/constants/ipc-events'
import { FlagConfigManager, IFlagConfig } from '#shared/schemas/flags.schema'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

export const OnAppStart = () => {
  const { setVersion } = useAppDataStore()
  const { setConfig, setFlag } = useUserDataStore()
  const intl = useIntl()

  useEffect(() => {
    document.title = intl.formatMessage({ id: 'appTitle' })
  }, [intl.locale])

  useIpcListener(IpcEvent.AppVersion, (_, v) => setVersion(v))
  useIpcListener(IpcEvent.Config.SendInitialConfig, (_, v) => {
    setConfig(v)
    console.log(v)
  })

  for (const flag of Object.keys(
    FlagConfigManager.getLastSchema().shape
  ) as (keyof IFlagConfig)[]) {
    useIpcListener(IpcEvent.Config.Flags(flag), (_, v) => setFlag(flag, v))
  }

  return null
}
