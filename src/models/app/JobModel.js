import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import TagCategoryModel from '../meta/TagCategoryModel'
import TagAreaModel from '../meta/TagAreaModel'
import SkillModel from '../meta/SkillModel'
import JobIPFSModel from './JobIPFSModel'

import * as JOB_STATES from './jobStates'

export const JOB_STATES_LIST = Object.keys(JOB_STATES)
export {
  JOB_STATES,
}

const schemaFactory = () => ({
  id: PropTypes.number.isRequired,
  // status: PropTypes.bool,
  client: PropTypes.string.isRequired,
  worker: PropTypes.string,
  state: PropTypes.oneOf(JOB_STATES_LIST),
  ipfs: PropTypes.instanceOf(JobIPFSModel),
  area: PropTypes.instanceOf(TagAreaModel),
  category: PropTypes.instanceOf(TagCategoryModel),
  skills: PropTypes.arrayOf(
    PropTypes.instanceOf(SkillModel)
  ),
})

export default class JobModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }

  get key () {
    return `job-${this.id}`
  }
}
