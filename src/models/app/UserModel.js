import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import UserAccountTypesModel from './UserAccountTypesModel'

export const schemaFactory = () => ({
  accountTypes: PropTypes.instanceOf(UserAccountTypesModel),
})

export default class UserModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
