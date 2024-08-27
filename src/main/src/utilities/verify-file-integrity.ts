import { IpcEvent } from '#shared/constants/ipc-events'
import { AppSettingsManager, IAppSettingsManager } from '#shared/schemas/settings.schema'
import path from 'node:path'
import { AppStore } from '../stores/app-store'
import { doesFileExists } from './extra-funcs'
import { FileIntegrity } from './FileIntegrity'
import { app } from 'electron'

export async function* verifyFileIntegrity() {
  const appStore = AppStore.getState()

  const settingsIntegrity = new FileIntegrity({
    filePath: AppStore.getState().settingsFilePath,
    defaultData: AppSettingsManager.getLastSchema().parse({
      databaseFilePath: path.join(app.getPath('appData'), app.getName(), `${app.getName()}.sqlite`)
    }),
    zodSchema: AppSettingsManager.getLastSchema(),
    onError: () => IpcEvent.Integrity.Verify.Settings.NotFound,
    onSuccess: () => IpcEvent.Integrity.Verify.Settings.Found
  })
  const { onFinal, data } = await settingsIntegrity.isFileOk()

  yield onFinal

  const dbExists = await doesFileExists(data.databaseFilePath!)
  if (dbExists) yield IpcEvent.Integrity.Verify.Db.Found
  else {
    yield IpcEvent.Integrity.Verify.Db.NotFound
    appStore.setSettings(data as IAppSettingsManager)
    await appStore.changeSettings(
      (settings) => (settings.databaseFilePath = data.databaseFilePath!)
    )
  }

  yield IpcEvent.Integrity.Finish
}
