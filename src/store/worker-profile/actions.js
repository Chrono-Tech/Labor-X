import { initialize, change, formValueSelector } from 'redux-form'
import * as backendApi from "../../api/backend"
import { userTokenSelector } from "../user/selectors"
import { getWorkerProfileInitialValues } from "./selectors"
import { WORKER_PROFILE_FORM } from "./reducer"
import VerificationRequestWorkerModel, { VerificationRequestWorkerSocialModel, VerificationRequestWorkerServiceModel, VerificationRequestWorkerEmploymentModel} from "../../api/backend/model/VerificationRequestWorkerModel";
import FileModel from "../../models/FileModel"

const getAttachmentsByServiceIndex = (attachmentsAll, serviceIndex) => {
  let attachments = [];
  attachmentsAll.forEach((element) => {
    if (element.serviceIndex === serviceIndex) {
      attachments.push(element.id);
    }
  })
  return attachments;
}

const getCurrenciesArrayModel = (data) => {
  let currencies = [];
  if (data.currencyBitcoin)
    currencies.push("BTC");
  if (data.currencyLhus)
    currencies.push("LHUS");
  return currencies;
}

const getAttachmentsArrayModel = (data) => {
  let attachments = ["5b48d9b5dc95100958724ed9"];
  return attachments;
}

const getSocialsArrayModel = (data) => {
  let attachments = [];
  if (data.facebook)
    attachments.push(new VerificationRequestWorkerSocialModel({  name: "Facebook", url: data.facebook }));
  if (data.linkedin)
    attachments.push(new VerificationRequestWorkerSocialModel({ name: "Linkedin", url: data.linkedin }));
  if (data.twitter)
    attachments.push(new VerificationRequestWorkerSocialModel({  name: "Twitter", url: data.twitter }));
  return attachments;
}

const getServicesArrayModel = (data, serviceAttachments) => {
  let services = [];
  let i = 0;
  if (data.services)
    data.services.forEach((element, index) => {
      i++;
      services.push(new VerificationRequestWorkerServiceModel({
        name: element.name,
        category: 1,//new ServiceCategoryModel({ id: String(element.category), name: "", code: String(element.category) }),
        description: "23",
        fee: String(element.fee),
        minFee: element.minFee,
        attachments: null //getAttachmentsByServiceIndex(serviceAttachments, index)
      }))
    })
  return services;
}

const getEmploymentsArrayModel = (data) => {
  let experiences = [];
  if (data.experiences)
    data.experiences.forEach((element) => {
      experiences.push(new VerificationRequestWorkerEmploymentModel({
        organization: element.organization,
        since: element.since,
        until: element.until,
        responsibilities: element.responsibilities
      }))
    });
  return experiences;
}

const workerProfileModelFromForm = (data, serviceAttachments) => {
  console.log(data);
  const currencies = getCurrenciesArrayModel(data);
  const pageBackground = null;
  const attachments = getAttachmentsArrayModel(data);
  const socials = getSocialsArrayModel(data);
  const services = getServicesArrayModel(data, serviceAttachments);
  const employments = getEmploymentsArrayModel(data);
  return new VerificationRequestWorkerModel({
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
  })
}

export const WORKER_PROFILE_REVIEW_REQUEST = 'WORKER_PROFILE/PROFILE_REVIEW/REQUEST'
export const WORKER_PROFILE_REVIEW_SUCCESS = 'WORKER_PROFILE/PROFILE_REVIEW/SUCCESS'
export const WORKER_PROFILE_REVIEW_FAILURE = 'WORKER_PROFILE/PROFILE_REVIEW/FAILURE'
export const reviewWorkerProfileRequest = (req) => ({ type: WORKER_PROFILE_REVIEW_REQUEST, payload: req })
export const reviewWorkerProfileSuccess = (res) => ({ type: WORKER_PROFILE_REVIEW_SUCCESS, payload: res })
export const reviewWorkerProfileFailure = (err) => ({ type: WORKER_PROFILE_REVIEW_FAILURE, payload: err })
export const reviewWorkerProfile = (data, serviceAttachments) => async (dispatch, getState) => {
  const workerProfile = workerProfileModelFromForm(data, serviceAttachments);
  try {
    dispatch(reviewWorkerProfileRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.submitWorkerProfile(workerProfile, token)
    const initialValues = getWorkerProfileInitialValues(res.profile)
    dispatch(initialize(WORKER_PROFILE_FORM, initialValues))
    dispatch(reviewWorkerProfileSuccess(res.profile))
  } catch (err) {
    dispatch(reviewWorkerProfileFailure(err))
  }
}


export const GET_WORKER_PROFILE_REQUEST = 'WORKER_PROFILE/GET/REQUEST'
export const GET_WORKER_PROFILE_SUCCESS = 'WORKER_PROFILE/GET/SUCCESS'
export const GET_WORKER_PROFILE_FAILURE = 'WORKER_PROFILE/GET/FAILURE'
export const getWorkerProfileRequest = (req) => ({ type: GET_WORKER_PROFILE_REQUEST, payload: req })
export const getWorkerProfileSuccess = (res) => ({ type: GET_WORKER_PROFILE_SUCCESS, payload: res })
export const getWorkerProfileFailure = (err) => ({ type: GET_WORKER_PROFILE_FAILURE, payload: err })
export const getWorkerProfile = () => async (dispatch, getState) => {
  try {
    dispatch(getWorkerProfileRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.getWorkerProfile(token)
    const initialValues = getWorkerProfileInitialValues(res.profile)
    dispatch(initialize(WORKER_PROFILE_FORM, initialValues))
    dispatch(getWorkerProfileSuccess(res.profile))
  } catch (err) {
    dispatch(getWorkerProfileFailure(err))
  }
}




export const SERVICE_ATTACHMENT_CREATE_REQUEST = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/REQUEST'
export const SERVICE_ATTACHMENT_CREATE_SUCCESS = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/SUCCESS'
export const SERVICE_ATTACHMENT_CREATE_FAILURE = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/FAILURE'
export const createServiceAttachmentRequest = (req) => ({ type: SERVICE_ATTACHMENT_CREATE_REQUEST, payload: req })
export const createServiceAttachmentSuccess = (res) => ({ type: SERVICE_ATTACHMENT_CREATE_SUCCESS, payload: res })
export const createServiceAttachmentFailure = (err) => ({ type: SERVICE_ATTACHMENT_CREATE_FAILURE, payload: err })
export const createServiceAttachment = (file: FileModel, serviceIndex: Number) => async (dispatch, getState) => {
  try {
    dispatch(createServiceAttachmentRequest({ file }))
    const state = getState()
    const token = userTokenSelector()(state)
    const attachment = await backendApi.uploadAttachment(file, token)
    dispatch(createServiceAttachmentSuccess({ attachment, file, serviceIndex }))
  } catch (err) {
    dispatch(createServiceAttachmentFailure(err))
  }
}



export const SERVICE_ATTACHMENT_DELETE = 'WORKER_PROFILE/SERVICE_ATTACHMENT_DELETE'
export const deleteServiceAttachment = (id) => async (dispatch, getState) => {
  dispatch({ type: SERVICE_ATTACHMENT_DELETE, payload: id });
}