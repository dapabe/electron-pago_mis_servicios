import { app, ipcMain } from 'electron'

import { IpcEvent } from '#shared/constants/ipc-events'
import { verifyFileIntegrity } from '../utilities/verify-file-integrity'
import { AppStore } from '../stores/app-store'
import { IIpcIntegrityInitialize } from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { StatusCodes } from 'http-status-codes'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { FlagConfigManager, IFlagConfig } from '#shared/schemas/flags.schema'
import { loadI18n } from '../utilities/loadi18n'

export async function ipcsOnStartUp() {
  ipcMain.handle(IpcEvent.App.Info, () => {
    return new IpcResponse(StatusCodes.OK, {
      env: process.env.NODE_ENV,
      version: app.getVersion()
    }).toResult()
  })

  ipcMain.handle(IpcEvent.Integrity.Initialize, async () => {
    const integrityGenerator = verifyFileIntegrity()
    let hasDB = true
    for await (const event of integrityGenerator) {
      if (event === IpcEvent.Integrity.Verify.Db.NotFound) hasDB = !hasDB
    }

    const x = AppStore.getState().settingsData

    return new IpcResponse<IIpcIntegrityInitialize>(StatusCodes.OK, {
      hasDB,
      preferredLocale: x.preferredLocale,
      databaseFilePath: x.databaseFilePath!
    })
  })

  ipcMain.handle(IpcEvent.Language.Messages, async (_, locale: string) => {
    return await loadI18n(locale)
  })

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
}
