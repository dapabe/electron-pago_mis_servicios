import { useIpcListener } from '#renderer/hooks/useIpcListener.hook'
import { useAppDataStore } from '#renderer/stores/app-data.store'
import { useUserDataStore } from '#renderer/stores/user-data.store'
import { IpcEvent } from '#shared/constants/ipc-events'
import { FlagConfigManager, IFlagConfig } from '#shared/schemas/flags.schema'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { WindowBody } from '../WindowBody'
import { Outlet } from 'react-router-dom'

export const OnAppStart = () => {
  const { setConfig, setFlag } = useUserDataStore()
  const { setVersion } = useAppDataStore()
  const intl = useIntl()

  useEffect(() => {
    document.title = intl.formatMessage({ id: 'appTitle' })
  }, [intl.locale])

  for (const flag of Object.keys(
    FlagConfigManager.getLastSchema().shape
  ) as (keyof IFlagConfig)[]) {
    useIpcListener(IpcEvent.Settings.Flag(flag), (_, v) => setFlag(flag, v))
  }
  console.log('first')
  return (
    <WindowBody title={intl.formatMessage({ id: 'appTitle' })}>
      <Outlet />
    </WindowBody>
  )
}
