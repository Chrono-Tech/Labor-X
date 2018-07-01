import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({})

export default class ProfileWorkerModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
