import ProfileWorkerModel from "../../api/backend/model/ProfileWorkerModel"
import { createSelector } from "reselect"
import ActionTurnedIn from "material-ui/SvgIcon";
export const getState = state => state.workerProfile
export const getAttachments = state => state.workerProfile.serviceAttachments
export const selectWorkerProfile = state => state.workerProfile
export const getAvatar = createSelector(getState, state => state.avatar)

export const getServiceAttachments = createSelector(getState, state => state.serviceAttachments)


export const getWorkerProfileInitialValues = (profile: ProfileWorkerModel) => {
    //вытаскиваем из профиля данные и суем их в начальные значения, 
    const linkedin = profile.socials.find(item => item.name === "Linkedin");
    const facebook = profile.socials.find(item => item.name === "Facebook");
    const twitter = profile.socials.find(item => item.name === "Twitter");
    const currencyBitcoin = profile.regular.currencies.find(item => item.symbol === "BTC");
    const currencyLhus = profile.regular.currencies.find(item => item.symbol === "LHUS");
    const data = {
        submitted: profile.submitted,
        isRequested: profile.isRequested,
        experiences: profile.employments,
        services: profile.services,
        intro: profile.verifiable.intro,
        linkedin: linkedin ? linkedin.url : "",
        facebook: facebook ? facebook.url : "",
        twitter: twitter ? twitter.url : "",
        hourlyChargeUsd: "",
        hourlyCharge: profile.regular.hourlyCharge,
        currencyLhus: currencyLhus ? true : false,
        currencyBitcoin: currencyBitcoin ? true : false
    }
    return data;
}
