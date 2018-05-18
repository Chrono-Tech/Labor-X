import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

export default class SkillModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }

  get code () {
    return Math.pow(2, this.index)
  }
}

export const SKILLS_LIST = [
  new SkillModel({
    index: 0,
    name: 'Skill 1',
  }),
  new SkillModel({
    index: 1,
    name: 'Skill 2',
  }),
  new SkillModel({
    index: 2,
    name: 'Skill 3',
  }),
]
