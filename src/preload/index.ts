import { contextBridge as bridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { preloadApi } from './preloadApi'

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
