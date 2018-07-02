import PropTypes from 'prop-types'
import faker from 'faker'
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
  lhus: PropTypes.number,
  endorsingSkills: PropTypes.bool,
  ratingRequirements: PropTypes.number,
  verificationRequirements: PropTypes.number,
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
  lhus: 0,
  ratingRequirements: 0,
  verificationRequirements: 0,
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
      logo: this.logo || faker.internet.avatar(),
      background: this.background || faker.image.image(64, 64),
      description: this.description,
      joinRequirement: this.joinRequirement && this.joinRequirement.index,
      fee: this.fee && this.fee.index,
      lhus: this.lhus !== undefined && +this.lhus,
      endorsingSkills: !!this.endorsingSkills,
      ratingRequirements: this.ratingRequirements,
      verificationRequirements: this.verificationRequirements,
    }
  }
}
