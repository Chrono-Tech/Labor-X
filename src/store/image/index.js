import PropTypes from 'prop-types'
import ImageModel from "../../api/backend/model/ImageModel";
import {AVATAR_UPLOAD_SUCCESS} from "../ui/general-profile";

export const IMAGE_SAVE = 'IMAGE_SAVE'

export const saveImage = (image: ImageModel) => ({ type: IMAGE_SAVE, image })

export const schemaFactory = () => ({
  id: PropTypes.objectOf(ImageModel).isRequired,
})

export const STATE = {
  id: {},
}

const mutations = {
  [ IMAGE_SAVE ]: (state, { image }) => ({ ...state, id: { ...state.id, [ image.id ]: image } }),
}

const reducer = (state = STATE, { type, ...other }) => type in mutations ? mutations[type](state, other) : state

export default reducer

export const getImageById = (id) => state => state.image.id[id] || null