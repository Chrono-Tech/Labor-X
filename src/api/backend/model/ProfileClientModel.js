import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'

const fragmentSchemaFactory = () => ({
  verifiable: {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    intro: PropTypes.string,
    pageBackground: PropTypes.instanceOf({}), // Joi.object().type(ImageModel).allow(null),
    website: PropTypes.string,
    email: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.instanceOf({})),  //Joi.array().items(Joi.object().type(AttachmentModel)).allow(null)
  },
  regular: {
    specializations: PropTypes.arrayOf(PropTypes.instanceOf({})),  //Joi.array().items(Joi.object().type(ServiceCategoryModel)).allow(null)
  },
  custom: PropTypes.any,
  collaborators:PropTypes.arrayOf(PropTypes.instanceOf({})),  // Joi.array().items(Joi.object().type(ClientCollaboratorModel)).allow(null)
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

export class CollaboratorModel extends AbstractModel {
  constructor (props) {
    super(props, {
      position: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
    Object.freeze(this)
  }
}
