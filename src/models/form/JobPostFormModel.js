import PropTypes from 'prop-types'
import { SkillModel, TagAreaModel, TagCategoryModel, SKILLS_LIST, TAG_AREAS_LIST, TAG_CATEGORIES_LIST } from 'src/models'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  name: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  responsibilities: PropTypes.string.isRequired,
  requirements: PropTypes.string.isRequired,
  // conclusion: PropTypes.string.isRequired,
  boardName: PropTypes.string,
  hourlyRate: PropTypes.number,
  totalHours: PropTypes.number,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  state: PropTypes.string,
  city: PropTypes.string,
  zip: PropTypes.string,
  street: PropTypes.string,
  building: PropTypes.string,
  suit: PropTypes.string,

  area: PropTypes.instanceOf(TagAreaModel).isRequired,
  category: PropTypes.instanceOf(TagCategoryModel).isRequired,
  skills: PropTypes.arrayOf(PropTypes.instanceOf(SkillModel)).isRequired,
})

const defaultProps = {
  boardName: 'General',
  hourlyRate: 20,
  totalHours: 5,
  startDate: new Date(new Date().getTime() + 86400000),
  endDate: new Date(new Date().getTime() + 86400000 * 3),
  state: 'Default state',
  city: 'Default city',
  zip: '010203',
  street: 'Default st.',
  building: '13',
  suit: '2',

  area: TAG_AREAS_LIST[0],
  category: TAG_CATEGORIES_LIST[0],
  skills: [SKILLS_LIST[0], SKILLS_LIST[1]],
}

export default class JobPostFormModel extends AbstractModel {
  constructor (props) {
    super(Object.assign(defaultProps, props), schemaFactory())
    Object.freeze(this)
  }

  get areaNumber () {
    return this.area.code
  }

  get categoryNumber () {
    return this.category.code
  }

  get skillsNumber () {
    return this.skills.map(s => s.code).reduce((a, b) => (a + b))
  }

  get ipfsData () {
    return {
      name: this.name,
      intro: this.intro,
      responsibilities: this.responsibilities,
      requirements: this.requirements,
      // conclusion: this.conclusion,
      boardName: this.boardName,
      hourlyRate: this.hourlyRate,
      totalHours: this.totalHours,
      startDateString: this.startDate.toString(),
      endDateString: this.endDate.toString(),
      state: this.state,
      city: this.city,
      zip: this.zip,
      street: this.street,
      building: this.building,
      suit: this.suit,
    }
  }
}
