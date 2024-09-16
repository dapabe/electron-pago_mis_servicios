import { app, ipcMain } from 'electron'
import { electronApp } from '@electron-toolkit/utils'
import { MainWindow } from './src/utilities/MainWindow'
import { FlagConfigManager, IFlagConfig } from '#shared/schemas/flags.schema'
import { IpcEvent } from '#shared/constants/ipc-events'
import { AppStore } from './src/stores/app-store'
import { AbstractIpcChannel } from './src/utilities/types/abstract-ipc-channel'
import { RawJavascript } from './src/utilities/constants/raw-javascript'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  /**
   *  Load event channels for main window
   */

  const channelFiles = await import('./src/events/for-main/index')
  const channels: AbstractIpcChannel[] = []
  for (const defChannelMod of Object.values(channelFiles) as unknown as AbstractIpcChannel[]) {
    channels.push(defChannelMod)
  }

  /**
   *  Register auto generated app flags
   */
  for (const flag of Object.keys(
    FlagConfigManager.getLastSchema().shape
  ) as (keyof IFlagConfig)[]) {
    const ipcFlag = IpcEvent.Settings.Flag(flag)
    ipcMain.handle(ipcFlag, async () => {
      await AppStore.getState().changeSettings((settings) => {
        settings.flags[flag] = !settings.flags[flag]
      })
    })
  }

  const main = new MainWindow().init(channels)

  for (const js of Object.values(RawJavascript)) {
    await main.webContents.executeJavaScript(js)
  }
})
