import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize'
import { TABLE_NAME } from '../../utilities/constants/table-names'
import { ISupportedServices, SupportedServices } from '#shared/constants/supported-services'

export class ServiceDataModel extends Model<
  InferAttributes<ServiceDataModel>,
  InferCreationAttributes<ServiceDataModel>
> {
  declare id: CreationOptional<string>
  declare user_name: ISupportedServices
  declare password: string
  declare account_number: number

  declare service_name: string
}

export default (sequelize: Sequelize) =>
  ServiceDataModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      service_name: {
        type: DataTypes.ENUM<ISupportedServices>,
        values: SupportedServices._def.values
      },
      user_name: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      account_number: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      sequelize,
      underscored: true,
      tableName: TABLE_NAME.SERVICE_DATA
    }
  )
