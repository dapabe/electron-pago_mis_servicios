import { IpcEvent } from '#shared/constants/ipc-events'
import { IIpcIntegrityInitialize } from '#shared/schemas/ipc-schemas/ipc-integrity.schema'
import { IpcResponse } from '#shared/utilities/IpcResponse'
import { StatusCodes } from 'http-status-codes'
import { AppStore } from '../../stores/app-store'
import { AbstractIpcChannel } from '../../utilities/types/abstract-ipc-channel'
import { verifyFileIntegrity } from '../../utilities/verify-file-integrity'

const IntegrityCheckerChannel: AbstractIpcChannel = {
  channelID: IpcEvent.Integrity.Initialize,

  async handleAsync() {
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
  }
}

export default IntegrityCheckerChannel
