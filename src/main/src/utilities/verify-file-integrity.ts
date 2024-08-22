import { IpcEvent } from '#shared/constants/ipc-events'
import { AppSettingsManager, IAppSettingsManager } from '#shared/schemas/settings.schema'
import { AppStore } from '../stores/app-store'
import { doesFileExists } from './extra-funcs'
import { FileIntegrity } from './FileIntegrity'

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
  appStore.setSettings(data as IAppSettingsManager)

  const dbExists = await doesFileExists(appStore.settingsData.databaseFilePath ?? '')
  if (!dbExists) yield IpcEvent.Integrity.Verify.Db.NotFound
  else yield IpcEvent.Integrity.Verify.Db.Found

  yield IpcEvent.Integrity.Finish
}
