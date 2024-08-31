import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { ISupportedServices, SupportedServices } from '#shared/constants/supported-services'
import { PaymentMethodModel } from './PaymentMethodModel'
import { IDefaultModelMethods } from '../../utilities/types/default.model'
import { TABLE_NAME } from '../../utilities/constants/table-names'

export class ServiceDataModel extends Model<
  InferAttributes<ServiceDataModel>,
  InferCreationAttributes<ServiceDataModel>
> {
  declare id: CreationOptional<string>
  declare serviceName: ISupportedServices
  declare userName: string
  declare password: string
  declare accountNumber: number

  declare idPaymentMethod?: ForeignKey<PaymentMethodModel['id']>
}

export default (): IDefaultModelMethods => ({
  init: (sequelize) =>
    ServiceDataModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        serviceName: {
          type: DataTypes.ENUM<ISupportedServices>,
          values: SupportedServices._def.values
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true
        },
        accountNumber: {
          type: DataTypes.INTEGER,
          allowNull: true
        },

        idPaymentMethod: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: PaymentMethodModel,
            key: 'id'
          }
        }
      },
      {
        sequelize,
        tableName: TABLE_NAME.SERVICE_DATA
      }
    ),
  associate: () => ServiceDataModel.belongsTo(PaymentMethodModel)
})
