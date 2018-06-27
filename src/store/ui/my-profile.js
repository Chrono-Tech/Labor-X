import PropTypes from 'prop-types'
import ProfileModel from "../../api/backend/model/ProfileModel";

export const schemaFactory = () => ({
  profile: PropTypes.instanceOf(ProfileModel),
})

const STATE = {
  profile: null,
}

const mutations = {

  [ PROFILE_REVIEW_REQUEST ]: (state, { req }) => ({ ...state, profile: req }),
  [ PROFILE_REVIEW_SUCCESS ]: (state, { res }) => ({ ...state, profile: res }),
  [ PROFILE_REVIEW_FAILURE ]: (state, { err }) => ({ ...state, profile: err }),

}

const reducer = (state = STATE, { type, ...other }) => type in mutations ? mutations[type](state, other) : state

export default reducer