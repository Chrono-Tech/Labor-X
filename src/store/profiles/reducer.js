import PropTypes from 'prop-types'
import ProfileModel from "../../api/backend/model/ProfileModel"
import {
    PROFILE_ADD
} from "./actions"

export const TYPES = {
    list: PropTypes.arrayOf(PropTypes.instanceOf(ProfileModel)),
    byAddressKey: PropTypes.shape({})
}

export const STATE = {
    list: [],
    byAddressKey: {}
}

/*eslint complexity: ["error", 44]*/
export default (state = STATE, { type, payload }) => {
    switch (type) {

        case PROFILE_ADD: {
            const findIndex = state.list.findIndex(item => item.id === payload.profile.id)
            return ({
                ...state,
                list: findIndex === -1
                    ? [...state.list, payload.profile]
                    : state.list,
                byAddressKey: {
                    ...state.byAddressKey,
                    [payload.address]: payload.profile
                }

            })
        }

        default: return ({
            ...state,
        })

    }
}
