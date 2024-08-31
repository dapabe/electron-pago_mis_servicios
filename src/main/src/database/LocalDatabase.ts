import { is } from '@electron-toolkit/utils'
import { Sequelize, Transaction } from 'sequelize'
import { app } from 'electron'
import os from 'node:os'
import crypto from 'node:crypto'
import keytar from 'keytar'
import { IpcResponse, IpcResponseResult } from '#shared/utilities/IpcResponse'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

export class LocalDatabase {
  static fileName = 'revision.sqlite'
  static instance: InstanceType<typeof Sequelize>

  static #userPassword: string
  static #masterKeyService = app.getName()
  static #masterKeyAccount = os.userInfo().username
  static #masterKey: string

  constructor(dbFilePath: string, password: string) {
    if (LocalDatabase.instance instanceof Sequelize) {
      return this
    }

    if (!LocalDatabase.getMasterKey()) {
      LocalDatabase.#masterKey = crypto.randomBytes(32).toString('hex')
      LocalDatabase.setMasterKey(LocalDatabase.#masterKey)
    }

    LocalDatabase.#userPassword = password

    LocalDatabase.instance = new Sequelize({
      dialect: 'sqlite',
      dialectModulePath: '@journeyapps/sqlcipher',
      pool: {
        max: 1
      },
      storage: dbFilePath,
      logging: console.log
    })

    //  SQLCipher configuration
    LocalDatabase.instance.query(`PRAGMA key = '${LocalDatabase.#userPassword}'`)
    LocalDatabase.instance.query('PRAGMA cipher_compatibility = 4')

    return this
  }

  static async setMasterKey(masterKey: string) {
    return await keytar.setPassword(
      LocalDatabase.#masterKeyService,
      LocalDatabase.#masterKeyAccount,
      masterKey
    )
  }

  static async getMasterKey() {
    return await keytar.getPassword(
      LocalDatabase.#masterKeyService,
      LocalDatabase.#masterKeyAccount
    )
  }

  async #loadModels() {
    try {
      const models = await import('./models/index')
      //  Initialize models
      for (const model of Object.values(models)) {
        LocalDatabase.instance.modelManager.addModel(model().init(LocalDatabase.instance))
      }
      //  Associate models
      for (const model of Object.values(models)) {
        model().associate?.()
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async initialize() {
    await this.#loadModels()
    await LocalDatabase.instance.sync({ force: is.dev }).catch(console.log)
  }

  static async changePassword(newPassword: string) {
    const masterKey = await LocalDatabase.getMasterKey()
    if (masterKey) {
      /**
       *  1.  Unlock the db using master key
       *  2.  Change the password
       *  3.  Lock the db using new user password
       */
      await LocalDatabase.instance.query(`PRAGMA key = '${masterKey}'`).catch(console.log)
      await LocalDatabase.instance.query(`PRAGMA rekey = '${newPassword}'`).catch(console.log)
      LocalDatabase.#userPassword = newPassword
    } else {
      throw new Error('Master key not found')
    }
  }

  static async withTransaction<T>(
    cb: (t: Transaction) => Promise<T>
  ): Promise<T | IpcResponseResult<string>> {
    const t = await LocalDatabase.instance.transaction()
    try {
      const result = await cb(t)
      await t.commit()
      return result
    } catch (error) {
      console.log({ error })
      await t.rollback()
      return new IpcResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
      ).toResult()
    }
  }
}
