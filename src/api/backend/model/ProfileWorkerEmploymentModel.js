
import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
    id: PropTypes.string,
    organization: PropTypes.string,
    since: PropTypes.string,
    until: PropTypes.string,
    responsibilities: PropTypes.string,
})

export default class ProfileWorkerEmploymentModel extends AbstractModel {
    constructor(props) {
        super(props, schemaFactory())
        Object.freeze(this)
    }
}
