import { ModelStatic, Sequelize } from 'sequelize'

export type IDefaultModelMethods<T = any> = {
  init: (seq: Sequelize) => ModelStatic<T>
  associate?: () => void
}
