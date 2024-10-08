import { IpcEvent } from '#shared/constants/ipc-events'
import { AppSettingsManager, IAppSettingsManager } from '#shared/schemas/settings.schema'
import path from 'node:path'
import { AppStore } from '../stores/app-store'
import { doesFileExists } from './extra-funcs'
import { FileIntegrity } from './FileIntegrity'
import { app } from 'electron'
import { LocalDatabase } from '../database/LocalDatabase'

export async function* verifyFileIntegrity() {
  const appStore = AppStore.getState()

  const settingsIntegrity = new FileIntegrity({
    filePath: AppStore.getState().settingsFilePath,
    defaultData: AppSettingsManager.getLastSchema().parse({}),
    zodSchema: AppSettingsManager.getLastSchema(),
    onError: () => IpcEvent.Integrity.Verify.Settings.NotFound,
    onSuccess: () => IpcEvent.Integrity.Verify.Settings.Found
  })
  const { onFinal, data } = await settingsIntegrity.isFileOk()
  yield onFinal

  const defaultDbPath = path.join(app.getPath('appData'), app.getName(), LocalDatabase.fileName)
  appStore.setSettings(data as IAppSettingsManager)

  if (!data.databaseFilePath || !data.databaseFilePath.length) {
    yield IpcEvent.Integrity.Verify.Db.NotFound
    await appStore.changeSettings((settings) => {
      settings.databaseFilePath = defaultDbPath
    })
    return yield IpcEvent.Integrity.Finish
  }

  const dbExists = await doesFileExists(data.databaseFilePath)
  if (dbExists) yield IpcEvent.Integrity.Verify.Db.Found
  else {
    yield IpcEvent.Integrity.Verify.Db.NotFound
    await appStore.changeSettings((settings) => {
      settings.databaseFilePath = defaultDbPath
    })
  }

  return yield IpcEvent.Integrity.Finish
}
