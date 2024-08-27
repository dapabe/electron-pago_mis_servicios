import { Sequelize } from 'sequelize'

export class LocalDatabase {
  static dbName = 'revision.sqlite'
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

  public async initialize() {
    await LocalDatabase.db.authenticate().then(console.log).catch(console.log)
  }
}
