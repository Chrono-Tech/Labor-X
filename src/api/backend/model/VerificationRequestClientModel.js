import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
  regular: PropTypes.shape({
    specializations:  PropTypes.arrayOf(PropTypes.number), 
  }),
  verifiable: PropTypes.shape({
    name: PropTypes.string.isRequired, 
    type: PropTypes.string.isRequired, 
    intro: PropTypes.string,
    pageBackground: PropTypes.string,
    website: PropTypes.string,
    email: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.string)
  }),
  custom: PropTypes.any(),
  collaborators: PropTypes.arrayOf(PropTypes.instanceOf(CollaboratorModel))
})

export default class ProfileClientModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}

export default class CollaboratorModel extends AbstractModel {
  constructor (props) {
    super(props, {
      position: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
    Object.freeze(this)
  }
}
