import { app, BrowserWindow, ipcMain } from 'electron'

import { IpcEvent } from '#shared/constants/ipc-events'
import { verifyFileIntegrity } from './utilities/verify-file-integrity'
import { AppStore } from './stores/app-store'
import path from 'path'
import {
  IIpcIntegrityInitialize,
  IIpcIntegrityLogin
} from '#shared/schemas/ipc-schemas/ipc-integrity.schema'

export async function onStartUp(mainWindow: BrowserWindow) {
  // mainWindow.webContents.once('did-finish-load', async () => {
  //   mainWindow.webContents.send(IpcEvent.Integrity.Initial)
  // })

  /**
   *  Verifies important file integrity and sends back to the
   *  renderer what is Node doing with events as values, afterwards
   *  returns.
   */
  ipcMain.handle(IpcEvent.Integrity.Initialize, async (evt) => {
    const integrityGenerator = verifyFileIntegrity()
    for await (const event of integrityGenerator) {
      evt.sender.send(IpcEvent.Integrity.Loader, event)
    }
    const x = AppStore().settingsData
    return {
      dbFilePath: x.databaseFilePath ?? path.join(app.getPath('appData'), 'revision.db'),
      skipServer: x.flags.skipServer
    } satisfies IIpcIntegrityInitialize
  })

  ipcMain.handle(IpcEvent.Integrity.Login, (_, data: IIpcIntegrityLogin) => {
    // evt
    // _.sender.
  })

  ipcMain.handle(IpcEvent.Db.Password.Create, (_, data: string) => {})
}
