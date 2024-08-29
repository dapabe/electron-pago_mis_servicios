import { is } from '@electron-toolkit/utils'
import { Sequelize } from 'sequelize'
import { UserModel } from './models/UserModel'

export class LocalDatabase {
  static fileName = 'revision.sqlite'
  static db: InstanceType<typeof Sequelize>

  constructor(dbFilePath: string) {
    if (LocalDatabase.db instanceof Sequelize) {
      return this
    }
    LocalDatabase.db = new Sequelize({
      dialect: 'sqlite',
      storage: dbFilePath
    })
    return this
  }

  async #loadModels() {
    const models = await import('./models/index')
    for (const model of Object.values(models)) {
      LocalDatabase.db.modelManager.addModel(model(LocalDatabase.db))
    }
  }

  public async initialize(password: string) {
    await LocalDatabase.db.authenticate().then(console.log).catch(console.log)
    await this.#loadModels()
    await LocalDatabase.db.sync({ force: is.dev }).catch(console.log)
  }

  public async register(password: string) {
    const t = await LocalDatabase.db.transaction()
    try {
      await UserModel.create(
        {
          password
        },
        { transaction: t }
      )

      await t.commit()
    } catch (error) {
      console.log(error)
      await t.rollback()
    }
  }
}
