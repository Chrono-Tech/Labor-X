import PropTypes from 'prop-types'
import {
  TagCategoryModel,
  BoardRequirementModel,
  BoardPostFeeModel
} from 'src/models'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  name: PropTypes.string,
  logo: PropTypes.string,
  background: PropTypes.string,
  description: PropTypes.string,
  tagCategories: PropTypes.arrayOf(TagCategoryModel),
  joinRequirement: PropTypes.instanceOf(BoardRequirementModel),
  fee: PropTypes.instanceOf(BoardPostFeeModel),
  lhus: PropTypes.string,
})

const defaultProps = {
  name: '',
  logo: '',
  background: '',
  description: '',
  tagCategories: '',
  joinRequirement: '',
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
      .reduce((mask, element) => (mask | element.code), 0)
  }
  
  get ipfsData () {
    return {
      hash: this.hash, // ipfs hash of the object itself
      name: this.name,
      logo: this.logo,
      background: this.background,
      description: this.description,
      fee: this.fee,
      lhus: this.lhus,
    }
  }
}
