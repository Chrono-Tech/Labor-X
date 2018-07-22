import ProfileWorkerModel from "../../api/backend/model/ProfileWorkerModel"
import VerificationRequestWorkerModel, {VerificationRequestWorkerSocialModel, VerificationRequestWorkerServiceModel, VerificationRequestWorkerEmploymentModel} from "../../api/backend/model/VerificationRequestWorkerModel"
import { createSelector } from "reselect"
import { WORKER_PROFILE_FORM } from "./reducer"

export const getState = state => state.workerProfile
export const getAttachments = state => state.workerProfile.serviceAttachments
export const selectWorkerProfile = state => state.workerProfile
export const getAvatar = createSelector(getState, state => state.avatar)

export const getCurrencies = createSelector(getState, state => state.currencies)

export const getServiceCategories = createSelector(getState, state => state.serviceCategories)

export const getServiceAttachments = createSelector(getState, state => state.serviceAttachments)

export const getSocials = createSelector(getState, state => state.workerProfile ? getWorkerProfileInitialValues(state.workerProfile).socials : [])

const getCurrenciesObj = (currencies) => {
    const obj={};
    currencies.forEach((item) => {
        obj[item.symbol]=true;
    })
    return obj
}

export const getWorkerProfileInitialValues = (data: ProfileWorkerModel) => {
    let profile = data.submitted || data.approved || {};
    profile={
        ...profile,
        services: profile.services ? profile.services.map((item) => {
            return {
                ...item,
                category: item.category.code
            }
        })
        :[],
        regular: {
            ...profile.regular,
            currenciesKeys: profile.regular.currencies ? getCurrenciesObj(profile.regular.currencies) : {}
        }
    }
    return profile;
}

export const workerProfileModelFromForm = (data) => {
    console.log(data);
   return new VerificationRequestWorkerModel({
    regular: {
		currencies: data.regular.currenciesKeys ? Object.keys(data.regular.currenciesKeys).filter((key) => data.regular.currenciesKeys[key]) : [],
		hourlyCharge: data.regular.hourlyCharge
    },
    verifiable: {
		intro: "Intro",
		pageBackground: null,
		attachments: ["5b48d9b5dc95100958724ed9"]
    },
    custom: {},
    socials: data.socials.map((item) => {
        return new VerificationRequestWorkerSocialModel({
            name: item.name,
            url: item.url,
        })
    }),
    services: data.services.map((item) => {
        return new VerificationRequestWorkerServiceModel({
            name: item.name,
            category: Number(item.category), // category code
            description: "Empty",
            fee: String(item.fee),
            minFee: String(item.minFee),
            attachments: null
        })
    }),
    employments: data.employments.map((item) => {
        return new VerificationRequestWorkerEmploymentModel({
            organization: item.organization,
            since: item.since,
            until: item.until,
            responsibilities: item.responsibilities
        })
    })
   })
};