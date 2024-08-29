import { DataTypes, Model, Sequelize } from 'sequelize'
import { TABLE_NAME } from '../../utilities/constants/table-names'

export class ServiceDataModel extends Model<{
  id: number
  serviceId: number
  userId: number
  password: string
}> {}

export default (sequelize: Sequelize) =>
  ServiceDataModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: TABLE_NAME.SERVICE_DATA
    }
  )
