import { IpcEvent } from '#shared/constants/ipc-events'
import { IIpcIntegrityInitialize } from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponseResult } from '#shared/utilities/IpcResponse'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: () => {
    const query = useQueryClient().getQueryData([
      IpcEvent.Integrity.Initialize
    ]) as IpcResponseResult<IIpcIntegrityInitialize>

    if (query.data.hasDB) return <Navigate to="/auth/login" />
    else return <Navigate to="/auth/register" />
  }
})
