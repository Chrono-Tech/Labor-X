import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
    id:  PropTypes.string.isRequired,
    symbol:  PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
})

export default class CurrencyModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
