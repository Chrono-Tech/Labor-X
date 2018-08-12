import PropTypes from 'prop-types'
import {
  TagModel,
  TagAreaModel,
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
  tagsCategory: PropTypes.arrayOf(PropTypes.instanceOf(TagCategoryModel)),
  tagsArea: PropTypes.arrayOf(PropTypes.instanceOf(TagAreaModel)),
  tags: PropTypes.arrayOf(PropTypes.instanceOf(TagModel)),
  joinRequirement: PropTypes.instanceOf(BoardRequirementModel),
  fee: PropTypes.instanceOf(BoardPostFeeModel),
  lht: PropTypes.number,
  endorsingSkills: PropTypes.bool,
  ratingRequirements: PropTypes.number,
  verificationRequirements: PropTypes.number,
  agreement: PropTypes.string,
})

const defaultProps = {
  name: '',
  logo: '',
  background: '',
  description: '',
  tagsCategory: '',
  tagsArea: '',
  tags: '',
  joinRequirement: 0,
  endorsingSkills: false,
  fee: 0,
  lht: 0,
  ratingRequirements: 0,
  verificationRequirements: 0,
  agreement: null,
}

export default class JobBoardFormModel extends AbstractModel {
  constructor (props) {
    super(Object.assign({}, defaultProps, props), schemaFactory())
    Object.freeze(this)
  }

  get categoriesBitmask (){
    return TagCategoryModel.writeArrayToMask(this.tagsCategory)
  }

  get areasBitmask (){
    return TagAreaModel.writeArrayToMask(this.tagsArea)
  }

  get tagsBitmask (){
    return TagModel.writeArrayToMask(this.tags)
  }

  get ipfsData () {
    return {
      hash: this.hash, // ipfs hash of the object itself
      name: this.name,
      description: this.description,
      joinRequirement: this.joinRequirement && this.joinRequirement.index,
      fee: this.fee && this.fee.index,
      lht: this.lht !== undefined && +this.lht,
      endorsingSkills: !!this.endorsingSkills,
      ratingRequirements: this.ratingRequirements,
      verificationRequirements: this.verificationRequirements,
      agreement: this.agreement && this.agreement,
      logo: this.logo && this.logo,
      background: this.background && this.background,
    }
  }
}
