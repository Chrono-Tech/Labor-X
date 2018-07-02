import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({})

export default class ProfileClientModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
