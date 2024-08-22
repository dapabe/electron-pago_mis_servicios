import { app, BrowserWindow, ipcMain } from 'electron'

import { IpcEvent } from '#shared/constants/ipc-events'
import { verifyFileIntegrity } from './utilities/verify-file-integrity'
import { AppStore } from './stores/app-store'
import path from 'path'
import {
  IIpcIntegrityInitialize,
  IIpcIntegrityLogin
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { LocalDatabase } from './database/LocalDatabase'
import { PromisedValue } from '#shared/utilities/promised-value'
import fs from 'node:fs/promises'
import { StatusCodes } from 'http-status-codes'
import { IpcResponse } from '#shared/utilities/IpcResponse'

export async function onStartUp(mainWindow: BrowserWindow) {
  // mainWindow.webContents.once('did-finish-load', async () => {
  //   mainWindow.webContents.send(IpcEvent.Integrity.Loader, 'asdasd')
  // })

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
      databaseFilePath:
        x.databaseFilePath ?? path.join(app.getPath('appData'), LocalDatabase.dbName),
      skipServer: x.flags.skipServer
    }).toResult()
  })

  ipcMain.handle(IpcEvent.Integrity.Login, (_, data: IIpcIntegrityLogin) => {
    // evt
    // _.sender.
    console.log(data)
  })

  ipcMain.handle(IpcEvent.Language.Messages, async (_) => {
    const [intlErr, intlMessage] = await PromisedValue(
      async () =>
        await fs.readFile(
          path.resolve(
            'resources',
            'intl',
            `${AppStore.getState().settingsData.preferredLocale}.json`
          ),
          'utf8'
        )
    )

    if (intlErr) return new IpcResponse(StatusCodes.NOT_FOUND, null).toResult()
    return new IpcResponse(StatusCodes.OK, JSON.parse(intlMessage)).toResult()
  })
}
