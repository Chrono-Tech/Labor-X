import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import TagCategoryModel from '../meta/TagCategoryModel'
import TagAreaModel from '../meta/TagAreaModel'
import SkillModel from '../meta/SkillModel'
import JobIPFSModel from './JobIPFSModel'

const schemaFactory = () => ({
  boardId: PropTypes.number,
  ipfs: PropTypes.instanceOf(JobIPFSModel),
  area: PropTypes.instanceOf(TagAreaModel),
  category: PropTypes.instanceOf(TagCategoryModel),
  skills: PropTypes.arrayOf(
    PropTypes.instanceOf(SkillModel)
  ),
})

export default class JobFormModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
