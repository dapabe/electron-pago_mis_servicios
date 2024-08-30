import { is } from '@electron-toolkit/utils'
import { Sequelize } from 'sequelize'
import { app } from 'electron'
import os from 'node:os'

export class LocalDatabase {
  static fileName = 'revision.sqlite'
  static db: InstanceType<typeof Sequelize>
  static #userPassword: string

  constructor(dbFilePath: string, password: string) {
    if (LocalDatabase.db instanceof Sequelize) {
      return this
    }
    LocalDatabase.#userPassword = password

    LocalDatabase.db = new Sequelize(app.getName(), os.userInfo().username, {
      dialect: 'sqlite',
      dialectModulePath: '@journeyapps/sqlcipher',
      pool: {
        max: 1
      },
      storage: dbFilePath,
      logging: console.log
    })

    //  SQLCipher configuration
    LocalDatabase.db.query(`PRAGMA key = '${LocalDatabase.#userPassword}'`)
    LocalDatabase.db.query('PRAGMA cipher_compatibility = 4')

    return this
  }

  async #loadModels() {
    const models = await import('./models/index')
    for (const model of Object.values(models)) {
      LocalDatabase.db.modelManager.addModel(model(LocalDatabase.db))
    }
  }

  public async initialize() {
    await this.#loadModels()
    await LocalDatabase.db.sync({ force: is.dev }).catch(console.log)
  }

  static async changePassword(newPassword: string) {
    await LocalDatabase.db.query(`PRAGMA rekey = '${newPassword}'`).catch(console.log)
    LocalDatabase.#userPassword = newPassword
  }
}
