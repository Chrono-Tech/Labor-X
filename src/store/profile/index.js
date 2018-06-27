import * as backendApi from "../../api/backend";
import {saveImage} from "../image";
import {userTokenSelector} from "../user/selectors";
import PropTypes from "prop-types";
import ProfileModel from "../../api/backend/model/ProfileModel";

export const PROFILE_REVIEW_REQUEST = 'PROFILE_REVIEW_REQUEST'
export const PROFILE_REVIEW_SUCCESS = 'PROFILE_REVIEW_SUCCESS'
export const PROFILE_REVIEW_FAILURE = 'PROFILE_REVIEW_FAILURE'

export const reviewProfileRequest = (req) => ({ type: PROFILE_REVIEW_REQUEST, req })
export const reviewProfileSuccess = (res) => ({ type: PROFILE_REVIEW_SUCCESS, res })
export const reviewProfileFailure = (err) => ({ type: PROFILE_REVIEW_FAILURE, err })

export const reviewProfile = () => async (dispatch, getState) => {
  try {
    dispatch(reviewProfileRequest(null))
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.reviewProfile(token)
    res.level1.submitted && res.level1.submitted.avatar && dispatch(saveImage(res.level1.submitted.avatar))
    dispatch(reviewProfileSuccess(res))
  } catch (err) {
    dispatch(reviewProfileFailure(err))
  }
}

export const schemaFactory = () => ({
  reviewProfileLoading: PropTypes.bool,
  profile: PropTypes.instanceOf(ProfileModel),
  reviewProfileFailure: PropTypes.bool,
})

const STATE = {
  reviewProfileLoading: false,
  profile: null,
  reviewProfileFailure: false,
}

const mutations = {

  [ PROFILE_REVIEW_REQUEST ]: (state, { req }) => ({ ...state,  profile: req }),
  [ PROFILE_REVIEW_SUCCESS ]: (state, { res }) => ({ ...state, profile: res }),
  [ PROFILE_REVIEW_FAILURE ]: (state, { err }) => ({ ...state, profile: err }),

}

const reducer = (state = STATE, { type, ...other }) => type in mutations ? mutations[type](state, other) : state

export default reducer