import { DataTypes, Model, Sequelize } from 'sequelize'
import { TABLE_NAME } from '../../utilities/constants/table-names'
import os from 'node:os'

export class UserModel extends Model<{
  id?: number
  name?: string
  password: string
}> {}

export default (sequelize: Sequelize) =>
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        defaultValue: os.userInfo().username
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: TABLE_NAME.USER
    }
  )
