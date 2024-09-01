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
  declare id: CreationOptional<number>
  declare serviceName: ISupportedServices
  declare userName: string | null
  declare password: string | null
  declare accountNumber: number | null

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
          allowNull: true,
          defaultValue: null
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
        },
        accountNumber: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null
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
