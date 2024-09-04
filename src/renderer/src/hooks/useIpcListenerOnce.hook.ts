import { IpcRendererListener } from '@electron-toolkit/preload'
import { useEffect } from 'react'

export const useIpcListenerOnce = (channel: string, fn: IpcRendererListener) => {
  useEffect(() => {
    const cb = window.electron.ipcRenderer.once(channel, fn)

    return () => cb()
  }, [])
}
