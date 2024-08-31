import { CardBrand, CardType, ICardBrand, ICardType } from '#shared/constants/cards'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'
import { ServiceDataModel } from './ServiceDataModel'
import { TABLE_NAME } from '../../utilities/constants/table-names'
import { IDefaultModelMethods } from '../../utilities/types/default.model'

export class PaymentMethodModel extends Model<
  InferAttributes<PaymentMethodModel>,
  InferCreationAttributes<PaymentMethodModel>
> {
  declare id: CreationOptional<string>
  declare alias: string

  declare fullName: string
  declare frontNumber: number
  declare expireDate: Date
  declare securityNumber: number
  declare type: CreationOptional<ICardType>
  declare brand: CreationOptional<ICardBrand>
}

export default (): IDefaultModelMethods => ({
  init: (sequelize) =>
    PaymentMethodModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        alias: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        fullName: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        frontNumber: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        expireDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        securityNumber: {
          type: DataTypes.TINYINT,
          allowNull: false,
          validate: {
            isInt: true,
            min: 3,
            max: 4
          }
        },
        type: {
          type: DataTypes.ENUM<ICardType>,
          allowNull: true,
          values: CardType._def.values
        },
        brand: {
          type: DataTypes.ENUM<ICardType>,
          allowNull: true,
          values: CardBrand._def.values
        }
      },
      {
        sequelize,
        tableName: TABLE_NAME.PAY_METHODS
      }
    ),
  associate: () => PaymentMethodModel.hasMany(ServiceDataModel, { foreignKey: 'idPaymentMethod' })
})
