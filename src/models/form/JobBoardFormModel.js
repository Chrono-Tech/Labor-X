import PropTypes from 'prop-types'
import { SkillModel, TagAreaModel, TagCategoryModel, SKILLS_LIST, TAG_AREAS_LIST, TAG_CATEGORIES_LIST } from 'src/models'
import AbstractModel from '../AbstractModel'
import {TAG_CATEGORY_ANY_MASK} from "../";

const schemaFactory = () => ({
  name: PropTypes.string,
  logo: PropTypes.string,
  background: PropTypes.string,
  description: PropTypes.string,
  tagCategories: PropTypes.string,
  fee: PropTypes.string,
  lhus: PropTypes.string,
})

const defaultProps = {
  name: '',
  logo: '',
  background: '',
  description: '',
  tagCategories: '',
  fee: '',
  lhus: '',
  
}

export default class JobPostFormModel extends AbstractModel {
  constructor (props) {
    super(Object.assign(defaultProps, props), schemaFactory())
    Object.freeze(this)
  }
  
  get categories(){
    return this.tagCategories
      .split(',')
      .map((item) => )
  }
  
  get ipfsData () {
    return {
      hash: this.hash, // ipfs hash of the object itself
      name: this.name,
      logo: this.logo,
      background: this.background,
      description: this.description,
      tagCategories: this.tagCategories,
      fee: this.fee,
      lhus: this.lhus,
    }
  }
}
