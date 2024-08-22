import { IpcEvent } from '#shared/constants/ipc-events'
import { app, BrowserWindow, ipcMain } from 'electron'
import { Sequence } from './sequence/Sequence'
import { AppStore } from './stores/app-store'
import { FlagConfigManager, IFlagConfig } from '#shared/schemas/flags.schema'
import path from 'path'
import fs from 'node:fs/promises'
import { IpcEventReturnType } from '#shared/types/ipc-returnTypes'
import { PromisedValue } from '#shared/utilities/promised-value'
import { StatusCodes } from 'http-status-codes'
import { ISupportedServices } from '#shared/constants/supported-services'

export async function loadBrowserEvents() {
  /**
   *  Custom application behaviour
   */
  ipcMain.on(IpcEvent.ToggleMaximize, (evt) => {
    if (BrowserWindow.fromWebContents(evt.sender)!.isMinimized())
      BrowserWindow.fromWebContents(evt.sender)!.maximize()
    else BrowserWindow.fromWebContents(evt.sender)!.minimize()
  })

  ipcMain.handle(IpcEvent.Config.InitialConfig, async () => {
    const [intlListErr, intlList] = await PromisedValue(
      async () => await fs.readdir(path.resolve('resources', 'intl'))
    )

    if (intlListErr) {
      return [
        {
          message: intlListErr.message,
          status: StatusCodes.INTERNAL_SERVER_ERROR
        } satisfies IpcEventReturnType['Error'],
        null
      ]
    }

    return [
      null,
      {
        appVersion: app.getVersion(),
        preferredLocale: 'es',
        locales: intlList!.map((x) => x.split('.')[0]),
        config: AppStore.getState().fileData
      } satisfies IpcEventReturnType['Config']['InitialConfig']
    ]
  })

  ipcMain.handle(IpcEvent.LanguageChange.Res, async () => {
    const [intlErr, intlMessage] = await PromisedValue(
      async () =>
        await fs.readFile(
          path.resolve('resources', 'intl', `${AppStore.getState().preferredLocale}.json`),
          'utf8'
        )
    )

    if (intlErr) {
      return [
        {
          message: intlErr.message,
          status: StatusCodes.NOT_FOUND
        } satisfies IpcEventReturnType['Error'],
        null
      ]
    }

    return [null, JSON.parse(intlMessage)]
  })

  /**
   *  Application config flags
   */
  for (const flag of Object.keys(
    FlagConfigManager.getLastSchema().shape
  ) as (keyof IFlagConfig)[]) {
    const ipcFlag = IpcEvent.Config.Flags(flag)
    ipcMain.handle(ipcFlag, async () => {
      await AppStore.getState().toggleFlag(flag)
      return AppStore.getState().fileData.flags[flag]
    })
  }

  /**
   *  Main application sequence
   */
  const seqInit = async (
    evt: Electron.IpcMainInvokeEvent,
    value: Record<ISupportedServices, boolean>
  ) => {
    const sequence = new Sequence(BrowserWindow.fromWebContents(evt.sender)!)
    await sequence.initialize(value)
  }

  ipcMain.handle(IpcEvent.Sequence.Started, seqInit)

  ipcMain.on(IpcEvent.CloseApp, (evt) => {
    ipcMain.removeHandler(IpcEvent.Sequence.Started)
    // ipcMain.removeListener(IpcEvent.Sequence.Started, seqInit)

    BrowserWindow.fromWebContents(evt.sender)?.close()
  })
}
