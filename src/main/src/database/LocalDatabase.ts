import { is } from '@electron-toolkit/utils'
import { Sequelize, Transaction } from 'sequelize'
import { app } from 'electron'
import os from 'node:os'
import crypto from 'node:crypto'
import keytar from 'keytar'
import { IpcResponse, IpcResponseResult } from '#shared/utilities/IpcResponse'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { ipcsForDatabaseCrud } from '../events/for-database-crud.ipcs'

export class LocalDatabase {
  static fileName = 'revision.sqlite'
  static sqlite: InstanceType<typeof Sequelize>

  static #masterKeyService = app.getName()
  static #masterKeyAccount = os.userInfo().username
  static #masterKey: string
  static #userPassword: string
  static #dbFilePath: string

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

  static async createInstance(dbFilePath: string, password: string) {
    if (LocalDatabase.sqlite) {
      return this
    }

    LocalDatabase.#dbFilePath = dbFilePath
    LocalDatabase.#userPassword = password

    const instance = new LocalDatabase()
    await instance.#initialize()

    await ipcsForDatabaseCrud()

    return instance
  }

  async #initialize() {
    if (!(await LocalDatabase.getMasterKey())) {
      LocalDatabase.#masterKey = crypto.randomBytes(32).toString('hex')
      await LocalDatabase.setMasterKey(LocalDatabase.#masterKey)
    }

    LocalDatabase.sqlite = new Sequelize({
      dialect: 'sqlite',
      dialectModulePath: '@journeyapps/sqlcipher',
      pool: {
        max: 2
      },
      storage: LocalDatabase.#dbFilePath
    })

    await LocalDatabase.sqlite.query(`PRAGMA key = :password`, {
      replacements: { password: LocalDatabase.#userPassword }
    })
    await LocalDatabase.sqlite.query('PRAGMA cipher_compatibility = 4')

    await this.#loadModels()
    await LocalDatabase.sqlite.sync({ alter: is.dev })
  }

  async #loadModels() {
    try {
      const models = await import('./models/index')
      //  Initialize models
      for (const model of Object.values(models)) {
        LocalDatabase.sqlite.modelManager.addModel(model().init(LocalDatabase.sqlite))
      }
      //  Associate models
      for (const model of Object.values(models)) {
        model().associate?.()
      }
    } catch (error) {
      console.log(error!['message'] as any)
    }
  }

  static async changePassword(newPassword: string) {
    const masterKey = await LocalDatabase.getMasterKey()
    if (!masterKey)
      return new IpcResponse(StatusCodes.INTERNAL_SERVER_ERROR, 'MASTER KEY NOT FOUND').toResult()

    try {
      /**
       *  1.  Unlock the db using master key
       *  2.  Change the password
       *  3.  Lock the db using new user password
       */
      await LocalDatabase.sqlite.query(`PRAGMA key = :masterKey`, {
        replacements: { masterKey }
      })
      await LocalDatabase.sqlite.query(`PRAGMA rekey = :newPassword`, {
        replacements: { newPassword }
      })
      LocalDatabase.#userPassword = newPassword
      return new IpcResponse(StatusCodes.OK, getReasonPhrase(StatusCodes.OK)).toResult()
    } catch (error) {
      console.log(error)
      return new IpcResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
      ).toResult()
    }
  }

  /**
   *  On error returns INTERNAL_SERVER_ERROR IpcResponse
   *  with reason phrase.
   *
   */
  static async withTransaction<T>(
    cb: (t: Transaction) => Promise<T>
  ): Promise<T | IpcResponseResult<string>> {
    const t = await LocalDatabase.sqlite.transaction()
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
