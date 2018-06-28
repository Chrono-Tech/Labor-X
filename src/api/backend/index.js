import axios from 'axios'

import ProfilePersonalVerificationRequestModel from "./model/ProfilePersonalVerificationRequestModel"
import ProfileContactsVerificationRequestModel from "./model/ProfileContactsVerificationRequestModel"
import FileModel from "./../../models/FileModel"
import SigninResBodyModel from "./model/SigninResBodyModel"
import ProfileModel from "./model/ProfileModel"
import ImageModel from "./model/ImageModel"
import ProfileContactsConfirmationRequestModel from "./model/ProfileContactsConfirmationRequestModel"
import ProfileContactsConfirmationResultsModel from "./model/ProfileContactsConfirmationResultsModel"

const API_URL = 'https://backend.profile.tp.ntr1x.com/api/v1'

const http = axios.create({ baseURL: API_URL })

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
    headers: { Authorization: `Signature ${ signature }` },
  }).then(res => SigninResBodyModel.fromJson(res.data))
}

export const reviewProfile = (token: string): ProfileModel => {
  return http.get(`${ API_URL }/security/me`, {
    headers: { Authorization: `Bearer ${ token }` },
  }).then(res => ProfileModel.fromJson(res.data))
}

export const uploadImage = (file: FileModel, token: string) : ImageModel => {
  const formData = new FormData()
  formData.append('image', file)
  return http.post(`${ API_URL }/media/image/upload`, formData, {
    headers: { Authorization: `Bearer ${ token }` },
  }).then(res => new ImageModel(res.data))
}

export const submitProfilePersonal = (data: ProfilePersonalVerificationRequestModel, token: string): ProfileModel => http.post(`${ API_URL }/security/me/profile/level1`, data, {
  headers: { Authorization: `Bearer ${ token }` },
}).then(res => ProfileModel.fromJson(res.data))

export const submitProfileContacts = (data: ProfileContactsVerificationRequestModel, token: string): ProfileModel => http.post(`${ API_URL }/security/me/profile/level2`, data, {
  headers: { Authorization: `Bearer ${ token }` },
}).then(res => ProfileModel.fromJson(res.data))

export const resendEmailCode = (token: string): ProfileModel => http.post(`${ API_URL }/security/me/profile/level2/validate/email`, null, {
  headers: { Authorization: `Bearer ${ token }` },
}).then(res => ProfileModel.fromJson(res.data))

export const resendPhoneCode = (token: string): ProfileModel => http.post(`${ API_URL }/security/me/profile/level2/validate/phone`, null, {
  headers: { Authorization: `Bearer ${ token }` },
}).then(res => ProfileModel.fromJson(res.data))

export const confirmProfileContacts = (data: ProfileContactsConfirmationRequestModel, token: string): ProfileContactsConfirmationResultsModel => http.post(
  `${ API_URL }/security/me/profile/level2/confirm`,
  data,
  { headers: { Authorization: `Bearer ${ token }` } }
).then(res => ProfileContactsConfirmationResultsModel.fromJson(res.data))
