import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'
import ServiceCategoryModel from './ServiceCategoryModel'
import AttachmentModel from './AttachmentModel'

export const VALIDATION_STATE = {
  INITIAL: 'INITIAL',
  WAITING: 'WAITING',
  WARNING: 'WARNING',
  SUCCESS: 'SUCCESS',
}
export const VALIDATION_STATE_TITLE = {
  [VALIDATION_STATE.INITIAL]: 'Validate',
  [VALIDATION_STATE.WAITING]: 'Validation is on review',
  [VALIDATION_STATE.WARNING]: 'Validation issue',
  [VALIDATION_STATE.SUCCESS]: 'Validated',
}

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

  static fromJson (data) {
    return new ProfileClientModel({
      ...data,
    })
  }

  static getValidationState (profile) {
    const { submitted, approved } = profile
    if (!submitted && !approved) return VALIDATION_STATE.INITIAL
    if (submitted && !submitted.validationComment) return VALIDATION_STATE.WAITING
    if (submitted && submitted.validationComment) return VALIDATION_STATE.WARNING
    if (!submitted && approved) return VALIDATION_STATE.SUCCESS
  }

  static getValidationComment (profile) {
    return profile.submitted && profile.submitted.validationComment
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
