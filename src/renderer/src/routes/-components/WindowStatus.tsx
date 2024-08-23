import { useRef } from 'react'
import { StatusBar } from './StatusBar'
import { useAppDataStore } from '#renderer/stores/app-data.store'

export function WindowStatus(): JSX.Element {
  const { appInfo } = useAppDataStore()
  const versions = useRef(window.electron.process.versions).current

  return (
    <>
      <StatusBar
        statuses={[
          `v${appInfo?.version}`,
          `Electron v${versions.electron}`,
          `Chromium v${versions.chrome}`,
          `Node v${versions.node}`
        ]}
      />
    </>
  )
}
