
import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
  id: PropTypes.string,
  name: PropTypes.string,
  code: PropTypes.string,
})

export default class ServiceCategoryModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
