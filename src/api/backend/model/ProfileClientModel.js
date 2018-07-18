import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'
import ServiceCategoryModel from './ServiceCategoryModel'
import AttachmentModel from './AttachmentModel'

const fragmentSchemaFactory = () => ({
  verifiable: {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    intro: PropTypes.string,
    pageBackground: PropTypes.instanceOf({}),
    website: PropTypes.string,
    email: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.instanceOf(AttachmentModel)), 
  },
  regular: {
    specializations: PropTypes.arrayOf(PropTypes.instanceOf(ServiceCategoryModel)), 
  },
  custom: PropTypes.any,
  collaborators:PropTypes.arrayOf(PropTypes.instanceOf(ClientCollaboratorModel)),  
})

const schemaFactory = () => ({
  id: PropTypes.string,
  submitted: PropTypes.shape({
    ...fragmentSchemaFactory(),
    validationComment: PropTypes.string,
  }),
  approved: PropTypes.shape({
    ...fragmentSchemaFactory(),
  }),
  isRequested: PropTypes.bool,
})

export default class ProfileClientModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}

export class ClientCollaboratorModel extends AbstractModel {
  constructor (props) {
    super(props, {
      position: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
    Object.freeze(this)
  }
}
