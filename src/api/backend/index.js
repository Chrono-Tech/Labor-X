import axios from 'axios'

import VerificationRequestLevel1Model from "./model/VerificationRequestLevel1Model";
import VerificationRequestLevel2Model from "./model/VerificationRequestLevel2Model";
import VerificationRequestLevel3Model from "./model/VerificationRequestLevel3Model";
import VerificationRequestLevel4Model from "./model/VerificationRequestLevel4Model";
import FileModel from "./../../models/FileModel";
import ConfirmationRequestLevel2Model from "./model/ConfirmationRequestLevel2Model";
import SigninResBodyModel from "./model/SigninResBodyModel";
import ProfileModel from "./model/ProfileModel";
import ImageModel from "./model/ImageModel";

const API_URL = 'https://backend.profile.tp.ntr1x.com/api/v1'
const WS_API_URL = 'https://backend.profile.tp.ntr1x.com/api/v1'

// const webSocket = window ? new WebSocket(WS_API_URL) : null

const COMMON_REQUEST_CONFIG = {
  headers: {
    'Access-Control-Request-Headers': 'Authorization'
  }
}

const http = axios.create({ baseURL: API_URL })

const OK_HANDLER = (res) => res.ok ? res : (() => { throw new Error(res.statusText) })()
const JSON_HANDLER = res => res.json()

function deepSortByKey (obj) {
  return Object.keys(obj).sort().reduce((acc, key) => {
    if (Array.isArray(obj[key])) {
      acc[key] = obj[key].map(deepSortByKey)
    } else if (typeof obj[key] === 'object') {
      acc[key] = deepSortByKey(obj[key])
    } else {
      acc[key] = obj[key]
    }
    return acc
  }, {})
}

export const signin = (account) : SigninResBodyModel => {
  const body = { purpose: 'laborx-session' }
  const data = JSON.stringify(deepSortByKey(body))
  const { signature } = account.sign(data)
  return http.post('/security/signin/signature', body, {
    headers: { Authorization: `Signature ${ signature }` }
  }).then(res => SigninResBodyModel.fromJson(res.data))
}

export const reviewProfile = (token: string): ProfileModel => {
  return http.get(`${ API_URL }/security/me`, {
    headers: { Authorization: `Bearer ${ token }` }
  }).then(res => ProfileModel.fromJson(res.data))
}

export const uploadImage = (file: FileModel, token: string) : ImageModel => {
  const formData = new FormData();
  formData.append('image', file);
  return http.post(`${ API_URL }/media/image/upload`, formData, {
    headers: { Authorization: `Bearer ${ token }` }
  }).then(res => new ImageModel(res.data))
}

export const submitLevel1 = (verificationRequestLevel1: VerificationRequestLevel1Model, token: string) => http.post(`${ API_URL }/security/me/profile/level1`, verificationRequestLevel1, {
  headers: { Authorization: `Bearer ${ token }` }
})

// export const uploadAttachment = (file: FileModel) => fetch(`${ API_URL }/media/file/upload`, {
//   method: 'POST',
//   body: file,
// }).then(OK_HANDLER).then(JSON_HANDLER);
//
// export const loadCurrentUser = () => fetch(`${ API_URL }/me`, {
//   method: 'GET',
// }).then(OK_HANDLER).then(JSON_HANDLER);
//
// export const sendVerificationRequestLevel1 = (verificationRequestLevel1: VerificationRequestLevel1Model) => fetch(`${ API_URL }/me/security/me/profile/level1`, {
//   method: 'POST',
//   body: verificationRequestLevel1,
// }).then(OK_HANDLER).then(JSON_HANDLER);
//
// export const sendVerificationRequestLevel2 = (verificationRequestLevel2: VerificationRequestLevel2Model) => fetch(`${ API_URL }/me/security/me/profile/level2`, {
//   method: 'POST',
//   body: verificationRequestLevel2,
// }).then(OK_HANDLER).then(JSON_HANDLER);
//
// export const sendVerificationRequestLevel3 = (verificationRequestLevel3: VerificationRequestLevel3Model) => fetch(`${ API_URL }/me/security/me/profile/level3`, {
//   method: 'POST',
//   body: verificationRequestLevel3,
// }).then(OK_HANDLER).then(JSON_HANDLER);
//
// export const sendVerificationRequestLevel4 = (verificationRequestLevel4: VerificationRequestLevel4Model) => fetch(`${ API_URL }/me/security/me/profile/level4`, {
//   method: 'POST',
//   body: verificationRequestLevel4,
// }).then(OK_HANDLER).then(JSON_HANDLER);
//
// export const validateLevel2Phone = () => fetch(`${ API_URL }/me/profile/level2/validate/phone`, {
//   method: 'POST',
// }).then(OK_HANDLER).then(JSON_HANDLER);
//
// export const validateLevel2Email = () => fetch(`${ API_URL }/me/profile/level2/validate/email`, {
//   method: 'POST',
// }).then(OK_HANDLER).then(JSON_HANDLER);
//
// export const confirmLevel2 = (confirmationRequestLevel2: ConfirmationRequestLevel2Model) => fetch(`${ API_URL }/me/profile/level2/confirm`, {
//   method: 'POST',
//   body: confirmationRequestLevel2,
// }).then(OK_HANDLER).then(JSON_HANDLER);
//
// export const updateNitificationSettings = (confirmationRequestLevel2: ConfirmationRequestLevel2Model) => fetch(`${ API_URL }/me/profile/notifications`, {
//   method: 'POST',
//   body: confirmationRequestLevel2,
// }).then(OK_HANDLER).then(JSON_HANDLER);
//
//