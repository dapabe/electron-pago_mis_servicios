import { CardBrand, CardType, ICardBrand, ICardType } from '#shared/constants/cards'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize'
import { TABLE_NAME } from '../../utilities/constants/table-names'

export class PaymentMethodModel extends Model<
  InferAttributes<PaymentMethodModel>,
  InferCreationAttributes<PaymentMethodModel>
> {
  declare id: CreationOptional<string>
  declare alias: string

  declare full_name: string
  declare front_number: string
  declare expire_date: Date
  declare security_number: number
  declare type: CreationOptional<ICardType>
  declare brand: CreationOptional<ICardBrand>
}

export default (sequelize: Sequelize) =>
  PaymentMethodModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      alias: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      full_name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      front_number: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      expire_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      security_number: {
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
      underscored: true,
      tableName: TABLE_NAME.PAY_METHODS
    }
  )
