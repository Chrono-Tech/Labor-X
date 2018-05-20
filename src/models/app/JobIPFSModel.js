import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  hash: PropTypes.string.isRequired, // ipfs hash of the object itself
  name: PropTypes.string,
  intro: PropTypes.string,
  responsibilities: PropTypes.string,
  requirements: PropTypes.string,
  // conclusion: PropTypes.string,
  boardName: PropTypes.string,
  hourlyRate: PropTypes.number,
  totalHours: PropTypes.number,
  startDateString: PropTypes.string,
  endDateString: PropTypes.string,
  state: PropTypes.string,
  city: PropTypes.string,
  zip: PropTypes.string,
  street: PropTypes.string,
  building: PropTypes.string,
  suit: PropTypes.string,
})

export default class JobIPFSModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
