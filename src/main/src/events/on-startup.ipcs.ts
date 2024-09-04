import { app, BrowserWindow, ipcMain } from 'electron'

import { IpcEvent } from '#shared/constants/ipc-events'
import { verifyFileIntegrity } from '../utilities/verify-file-integrity'
import { AppStore } from '../stores/app-store'
import path from 'path'
import { IIpcIntegrityInitialize } from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { PromisedValue } from '#shared/utilities/promised-value'
import fs from 'node:fs/promises'
import { StatusCodes } from 'http-status-codes'
import { IpcResponse, IpcResponseResult } from '#shared/utilities/IpcResponse'
import { FlagConfigManager, IFlagConfig } from '#shared/schemas/flags.schema'
import { AppIntlSchema, IAppIntl } from '#shared/schemas/intl.schema'
import { ZodError } from 'zod'

export async function ipcsOnStartUp(mainWin: BrowserWindow) {
  mainWin.webContents.once('did-finish-load', async () => {
    const intlPath = path.resolve(
      'resources',
      'intl',
      `${AppStore.getState().settingsData.preferredLocale}.json`
    )
    const [intlErr, intlMessage] = await PromisedValue(
      async () => await fs.readFile(intlPath, 'utf-8')
    )
    let messageResponse: IpcResponseResult<Partial<IAppIntl> | ZodError<IAppIntl>>
    if (intlErr) messageResponse = new IpcResponse(StatusCodes.NOT_FOUND, {}).toResult()

    const validated = AppIntlSchema.safeParse(JSON.parse(intlMessage!))
    if (!validated.success) {
      messageResponse = new IpcResponse(StatusCodes.NOT_ACCEPTABLE, validated.error).toResult()
    } else {
      messageResponse = new IpcResponse(StatusCodes.OK, validated.data).toResult()
    }
    mainWin.webContents.send(IpcEvent.Language.Messages, messageResponse)
  })

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

  ipcMain.on(IpcEvent.App.ToggleMaximize, () => {
    if (mainWin.isMinimized()) mainWin.maximize()
    else mainWin.minimize()
  })

  ipcMain.once(IpcEvent.App.CloseApp, (evt) => {
    BrowserWindow.fromWebContents(evt.sender)!.close()
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
