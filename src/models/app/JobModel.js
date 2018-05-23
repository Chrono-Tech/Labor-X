import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import TagCategoryModel from '../meta/TagCategoryModel'
import TagAreaModel from '../meta/TagAreaModel'
import SkillModel from '../meta/SkillModel'
import JobStateModel from './JobStateModel'
import JobIPFSModel from './JobIPFSModel'
import JobExtraModel from './JobExtraModel'

const schemaFactory = () => ({
  id: PropTypes.number.isRequired,
  client: PropTypes.string.isRequired,
  worker: PropTypes.string,
  boardId: PropTypes.number,
  state: PropTypes.instanceOf(JobStateModel),
  ipfs: PropTypes.instanceOf(JobIPFSModel),
  extra: PropTypes.instanceOf(JobExtraModel),
  area: PropTypes.instanceOf(TagAreaModel),
  category: PropTypes.instanceOf(TagCategoryModel),
  skills: PropTypes.arrayOf(
    PropTypes.instanceOf(SkillModel)
  ),
})

export default class JobModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  get key () {
    return `job-${this.id}`
  }
}
