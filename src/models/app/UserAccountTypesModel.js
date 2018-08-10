import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

export const schemaFactory = () => ({
  client: PropTypes.bool,
  worker: PropTypes.bool,
  recruiter: PropTypes.bool,
})

export default class UserAccountTypesModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static fromProfiles (recruiter, client, worker) {
    return new UserAccountTypesModel({
      recruiter: recruiter.isRequested ,
      client: client.isRequested,
      worker: worker.isRequested,
    })
  }
}
