
import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'
import AttachmentModel from "./AttachmentModel"
import ServiceCategoryModel from "./ServiceCategoryModel"

const schemaFactory = () => ({
    name: PropTypes.string,
    category: PropTypes.number.isRequired,
    description: PropTypes.string,
    fee: PropTypes.string,
    minFee: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.string)
})

export default class ProfileWorkerServiceModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
