import { IpcRendererListener } from '@electron-toolkit/preload'
import { useEffect } from 'react'

export const useIpcListener = (channel: string, fn: IpcRendererListener) => {
  useEffect(() => {
    const cb = window.electron.ipcRenderer.on(channel, fn)

    return () => cb()
  }, [])
}
