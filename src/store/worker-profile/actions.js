import { change, formValueSelector } from 'redux-form'
import * as backendApi from "../../api/backend"
import { userTokenSelector } from "../user/selectors"
import { WORKER_PROFILE_FORM } from "./reducer"
import CurrencyModel from "../../api/backend/model/CurrencyModel"
import ImageModel from "../../api/backend/model/ImageModel"
import AttachmentModel from "../../api/backend/model/AttachmentModel"
import ProfileWorkerModel from "../../api/backend/model/ProfileWorkerModel"
import ProfileWorkerSocialModel from "../../api/backend/model/ProfileWorkerSocialModel"
import ProfileWorkerServiceModel from "../../api/backend/model/ProfileWorkerServiceModel"
import ProfileWorkerEmploymentModel from "../../api/backend/model/ProfileWorkerEmploymentModel"
import ServiceCategoryModel from "../../api/backend/model/ServiceCategoryModel"
import FileModel from "../../models/FileModel"

const getCurrenciesArrayModel = (data) => {
  let currencies = [];
  if (data.currencyBitcoin)
    currencies.push(new CurrencyModel({ id: "0", symbol: "BTC", title: "Bitcoin" }));
  if (data.currencyLhus)
    currencies.push(new CurrencyModel({ id: "1", symbol: "LHUS", title: "Lhus" }));
  if (data.currencyAnother)
    currencies.push(new CurrencyModel({ id: "2", symbol: "ANY", title: "Another" }));
  return currencies;
}

const getAttachmentsArrayModel = (data) => {
  let attachments = [];
  return attachments;
}

const getSocialsArrayModel = (data) => {
  let attachments = [];
  if (data.facebook)
    attachments.push(new ProfileWorkerSocialModel({ id: "0", name: "Facebook", url: data.facebook }));
  if (data.linkedin)
    attachments.push(new ProfileWorkerSocialModel({ id: "1", name: "Linkedin", url: data.linkedin }));
  if (data.twitter)
    attachments.push(new ProfileWorkerSocialModel({ id: "2", name: "Twitter", url: data.twitter }));
  return attachments;
}

const getServicesArrayModel = (data) => {
  let services = [];
  let i = 0;
  if (data.services)
    data.services.forEach((element) => {
      i++;
      services.push({
        id: i.toString(),
        name: element.name,
        category: new ServiceCategoryModel({ id: element.category.toString(), name: "", code: element.category.toString() }),
        description: "",
        fee: element.fee.toString(),
        minFee: element.feeFrom.toString(),
        attachments: []
      })
    })
  return services;
}

const getEmploymentsArrayModel = (data) => {
  let experiences = [];
  if (data.experiences)
    data.experiences.forEach((element) => {
      experiences.push(new ProfileWorkerEmploymentModel({
        id: "",
        organization: element.organisation,
        since: element.workFrom,
        until: element.workTo,
        responsibilities: element.responsibilities
      }))
    });
  return experiences;
}

const workerProfileModelFromForm = (data) => {
  const currencies = getCurrenciesArrayModel(data);
  const pageBackground = null;
  const attachments = getAttachmentsArrayModel(data);
  const socials = getSocialsArrayModel(data);
  const services = getServicesArrayModel(data);
  const employments = getEmploymentsArrayModel(data);
  return {
    regular: {
      currencies: currencies,
      hourlyCharge: data.hourlyCharge
  },
  verifiable: {
      intro: data.intro,
      pageBackground: pageBackground,
      attachments: attachments
  },
  custom: null,
  socials: socials,
  services: services,
  employments: employments
  }
}

export const WORKER_PROFILE_REVIEW_REQUEST = 'WORKER_PROFILE/PROFILE_REVIEW/REQUEST'
export const WORKER_PROFILE_REVIEW_SUCCESS = 'WORKER_PROFILE/PROFILE_REVIEW/SUCCESS'
export const WORKER_PROFILE_REVIEW_FAILURE = 'WORKER_PROFILE/PROFILE_REVIEW/FAILURE'
export const reviewWorkerProfileRequest = (req) => ({ type: WORKER_PROFILE_REVIEW_REQUEST, payload: req })
export const reviewWorkerProfileSuccess = (res) => ({ type: WORKER_PROFILE_REVIEW_SUCCESS, payload: res })
export const reviewWorkerProfileFailure = (err) => ({ type: WORKER_PROFILE_REVIEW_FAILURE, payload: err })
export const reviewWorkerProfile = (data) => async (dispatch, getState) => {
  // const workerProfile = workerProfileModelFromForm(data);
  // console.log(workerProfile);
  // try {
  //   dispatch(reviewWorkerProfileRequest())
  //   const state = getState()
  //   const token = userTokenSelector()(state)
  //   const profile = await backendApi.submitWorkerProfile(data, token)
  //   dispatch(reviewWorkerProfileSuccess(profile))
  // } catch (err) {
  //   dispatch(reviewWorkerProfileFailure(err))
  // }
}




export const SERVICE_ATTACHMENT_CREATE_REQUEST = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/REQUEST'
export const SERVICE_ATTACHMENT_CREATE_SUCCESS = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/SUCCESS'
export const SERVICE_ATTACHMENT_CREATE_FAILURE = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/FAILURE'
export const createServiceAttachmentRequest = (req) => ({ type: SERVICE_ATTACHMENT_CREATE_REQUEST, payload: req })
export const createServiceAttachmentSuccess = (res) => ({ type: SERVICE_ATTACHMENT_CREATE_SUCCESS, payload: res })
export const createServiceAttachmentFailure = (err) => ({ type: SERVICE_ATTACHMENT_CREATE_FAILURE, payload: err })
export const createServiceAttachment = (file: FileModel) => async (dispatch, getState) => {
  try {
    dispatch(createServiceAttachmentRequest({ file }))
    const state = getState()
    const token = userTokenSelector()(state)
    console.log(file);
    console.log(token);
    const attachment = await backendApi.uploadAttachment(file, token)
    console.log(attachment);
    const attachments = formValueSelector(WORKER_PROFILE_FORM)(state, 'attachments')
    //dispatch(change(WORKER_PROFILE_FORM, 'attachments', [ ...attachments, attachment.id ]))
    dispatch(createServiceAttachmentSuccess({ attachment, file }))
  } catch (err) {
    dispatch(createServiceAttachmentFailure(err))
  }
}
