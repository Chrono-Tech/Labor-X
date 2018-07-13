
import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
    organization: PropTypes.string,
    since: PropTypes.instanceOf(Date),
    until: PropTypes.instanceOf(Date),
    responsibilities: PropTypes.string,
})

export default class ProfileWorkerEmploymentModel extends AbstractModel {
    constructor(props) {
        super(props, schemaFactory())
        Object.freeze(this)
    }
}
