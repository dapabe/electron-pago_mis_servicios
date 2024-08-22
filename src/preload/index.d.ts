import { ElectronAPI } from '@electron-toolkit/preload'
import { preloadApi } from './preloadApi'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof preloadApi
  }
}
