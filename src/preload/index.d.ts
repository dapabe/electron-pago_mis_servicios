import { ElectronAPI } from '@electron-toolkit/preload'
import { preloadApi } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof preloadApi
  }
}
