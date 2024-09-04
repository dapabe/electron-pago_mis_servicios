import { useQueryClient } from '@tanstack/react-query'
import { IpcEvent } from '#shared/constants/ipc-events'
import { IpcResponseResult } from '#shared/utilities/IpcResponse'

export function WindowStatus(): JSX.Element {
  const app = useQueryClient().getQueryData([IpcEvent.App.Info]) as IpcResponseResult<{
    version: string
  }>

  return (
    <p>
      <span className="noDraggable">{`v${app.data.version}`}</span>
    </p>
  )
}
