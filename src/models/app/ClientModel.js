import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'
import * as Categories from '../meta/TagCategoryModel'
import ClientIPFSModel from './ClientIPFSModel'
import ClientExtraModel from './ClientExtraModel'

const { TAG_CATEGORIES_LIST } = Categories
const TagCategoryModel = Categories.default

const schemaFactory = () => ({
  id: PropTypes.number.isRequired,
  tagsCategory: PropTypes.arrayOf(
    PropTypes.instanceOf(TagCategoryModel)
  ),
  ipfs: PropTypes.instanceOf(ClientIPFSModel),
  extra: PropTypes.instanceOf(ClientExtraModel),
})

export default class ClientModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }

  get key () {
    return `client-${this.id}`
  }
}

function propsWithDefaults (props) {
  const { id, tagsCategory, ...other } = props
  return Object.assign({}, {
    id: id != null
      ? id
      : faker.random.number(),
    tagsCategory: tagsCategory != null
      ? tagsCategory
      : [
        faker.random.arrayElement(TAG_CATEGORIES_LIST),
        faker.random.arrayElement(TAG_CATEGORIES_LIST),
        faker.random.arrayElement(TAG_CATEGORIES_LIST),
      ],
    ipfs: new ClientIPFSModel(props.ipfs || {}),
    extra: new ClientExtraModel(props.extra || {}),
  }, other)
}
