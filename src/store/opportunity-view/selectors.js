import { CLIENT_TYPE_ORGANISATION } from 'src/models'
export const getState = state => state.opportunityView

export const getClientProfile = (profile: ProfileClientModel) => {
    let clientProfile;
    if (profile) {
        clientProfile = profile.submitted || profile.approved || {}
    } else {
        clientProfile = {}
    }
    return {
        custom: {
            ...clientProfile.custom,
        },
        verifiable: {
            type: CLIENT_TYPE_ORGANISATION.name,
            ...clientProfile.verifiable,
        },
        regular: {
            ...clientProfile.regular,
        },
    }
} 