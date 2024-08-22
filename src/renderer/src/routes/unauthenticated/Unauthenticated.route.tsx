import { useAppDataStore } from '#renderer/stores/app-data.store'
import { useUserDataStore } from '#renderer/stores/user-data.store'

export const UnauthenticatedRoute = () => {
  const { setConfig, setFlag } = useUserDataStore()
  const { setVersion } = useAppDataStore()

  // for (const flag of Object.keys(
  //   FlagConfigManager.getLastSchema().shape
  // ) as (keyof IFlagConfig)[]) {
  //   useIpcListener(IpcEvent.Settings.Flag(flag), (_, v) => setFlag(flag, v))
  // }

  return <div>asd</div>
}
