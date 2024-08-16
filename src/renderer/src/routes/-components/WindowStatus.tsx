import { useState } from 'react'
import { StatusBar } from './StatusBar'

export function WindowStatus(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <>
      <StatusBar
        statuses={[
          'App Alpha',
          `Electron v${versions.electron}`,
          `Chromium v${versions.chrome}`,
          `Node v${versions.node}`
        ]}
      />
    </>
  )
}
