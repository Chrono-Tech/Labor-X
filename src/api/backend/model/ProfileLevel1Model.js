import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
import ImageModel from "./ImageModel";

const schemaFactory = () => ({
  submitted: PropTypes.shape({
    userName: PropTypes.string,
    birthDate: PropTypes.string,
    avatar: PropTypes.instanceOf(ImageModel),
    validationComment: PropTypes.string,
  }),
  approved: PropTypes.shape({
    userName: PropTypes.string,
    birthDate: PropTypes.string,
    avatar: PropTypes.instanceOf(ImageModel)
  })
})

export default class ProfileLevel1Model extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
