import PropTypes from 'prop-types'
import {
  TagCategoryModel,
  BoardRequirementModel,
  BoardPostFeeModel,
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
  lhus: PropTypes.number,
  endorsingSkills: PropTypes.bool,
})

const defaultProps = {
  name: '',
  logo: '',
  background: '',
  description: '',
  tagCategories: '',
  joinRequirement: 0,
  endorsingSkills: false,
  fee: 0,
  lhus: 0,
}

export default class JobPostFormModel extends AbstractModel {
  constructor (props) {
    super(Object.assign(defaultProps, props), schemaFactory())
    Object.freeze(this)
  }
  
  get categories (){
    return TagCategoryModel.writeArrayToMask(this.tagCategories)
  }
  
  get ipfsData () {
    return {
      hash: this.hash, // ipfs hash of the object itself
      name: this.name,
      logo: this.logo,
      background: this.background,
      description: this.description,
      joinRequirement: this.joinRequirement && this.joinRequirement.index,
      fee: this.fee && this.fee.index,
      lhus: this.lhus !== undefined && +this.lhus,
      endorsingSkills: !!this.endorsingSkills,
    }
  }
}
