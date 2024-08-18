import { useIpcListener } from '#renderer/hooks/useIpcListener.hook'
import { useAppDataStore } from '#renderer/stores/app-data.store'
import { useUserDataStore } from '#renderer/stores/user-data.store'
import { IpcEvent } from '#shared/constants/ipc-events'
import { FlagConfigManager, IFlagConfig } from '#shared/schemas/flags.schema'
import { useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'

export const OnAppStart = () => {
  const { setVersion } = useAppDataStore()
  const { setFlags } = useUserDataStore()
  const intl = useIntl()

  useEffect(() => {
    document.title = intl.formatMessage({ id: 'appTitle' })
  }, [intl.locale])

  useIpcListener(IpcEvent.AppVersion, (_, v) => setVersion(v))
  useIpcListener(IpcEvent.Config.SendInitialConfig, (_, v) => setFlags(v))

  for (const flag of Object.keys(
    FlagConfigManager.getLastSchema().shape
  ) as (keyof IFlagConfig)[]) {
    const memoedFlag = useMemo(() => IpcEvent.Config.Flags(flag), [])
    useIpcListener(memoedFlag, (_, v) => {
      console.log(v)
      setFlags(v)
    })
  }

  return null
}
