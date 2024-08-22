import { contextBridge as bridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IpcEvent } from '#shared/constants/ipc-events'
import { StatusCodes } from 'http-status-codes'
import { IpcIntegrityLoginSchema } from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponse } from '#shared/utilities/IpcResponse'

// Custom APIs for renderer
export const preloadApi = {
  integrityInitialize: async () => await ipcRenderer.invoke(IpcEvent.Integrity.Initialize),
  integrityLogin: async (data: unknown): Promise<IpcResponse> => {
    const validated = IpcIntegrityLoginSchema.safeParse(data)
    if (!validated.success) {
      return new IpcResponse(StatusCodes.BAD_REQUEST)
    }
    //todo check pass ok

    await ipcRenderer.invoke(IpcEvent.Integrity.Login, validated.data)

    return new IpcResponse(StatusCodes.OK)
  }
} as const

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    bridge.exposeInMainWorld('electron', electronAPI)
    bridge.exposeInMainWorld('api', preloadApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = preloadApi
}
