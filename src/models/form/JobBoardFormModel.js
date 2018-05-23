import PropTypes from 'prop-types'
import { SkillModel, TagAreaModel, TagCategoryModel, SKILLS_LIST, TAG_AREAS_LIST, TAG_CATEGORIES_LIST } from 'src/models'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  hash: PropTypes.string.isRequired, // ipfs hash of the object itself
  name: PropTypes.string,
  description: PropTypes.string,
  logo: PropTypes.string, // Any supported URL path, including //example.com/path/to/image, https://example.com/path/to/image , ipfs://example.com/path/to/image
  tags: PropTypes.arrayOf(
    PropTypes.instanceOf(TagCategoryModel)
  )
})

const defaultProps = {
  hash: '',
  name: '',
  description: '',
  logo: '',
}

export default class JobPostFormModel extends AbstractModel {
  constructor (props) {
    super(Object.assign(defaultProps, props), schemaFactory())
    Object.freeze(this)
  }
  
  get ipfsData () {
    return {
      hash: this.hash, // ipfs hash of the object itself
      name: this.name,
      description: this.description,
      logo: this.logo,
    }
  }
}
