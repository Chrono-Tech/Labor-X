// @flow
import axios from 'axios'

import FileModel from "./../../models/FileModel"
import SigninResBodyModel from "./model/SigninResBodyModel"
import ProfileModel from "./model/ProfileModel"
import ImageModel from "./model/ImageModel"
import AttachmentModel from "./model/AttachmentModel"
import PersonModel from "./model/PersonModel"
import ProfileClientModel from "./model/ProfileClientModel"
import ProfileWorkerModel from "./model/ProfileWorkerModel"

const API_URL = 'https://backend.profile.tp.ntr1x.com/api/v1'
// const API_URL = 'http://localhost:3000/api/v1'

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

export const signin = (account, roles): SigninResBodyModel => {
  const body = { purpose: 'laborx' }
  if (roles) body.roles = roles
  const data = JSON.stringify(deepSortByKey({ url: '/api/v1/security/signin/signature/laborx', body }))
  const { signature } = account.sign(data)
  return http.post('/security/signin/signature/laborx', body, {
    headers: { Authorization: `Signature ${ signature }` },
  }).then(res => SigninResBodyModel.fromJson(res.data))
}

export const getPerson = (address: string): Promise<PersonModel> => new Promise((resolve, reject) => http
  .get('/security/person', { params: { address } })
  .then(res => resolve(new PersonModel(res.data)))
  .catch(res => res.response.status === 404 ? resolve(null) : reject(res))
)

export const reviewProfile = (token: string): ProfileModel => {
  return http.get(`${ API_URL }/security/me`, {
    headers: { Authorization: `Bearer ${ token }` },
  }).then(res => ProfileModel.fromJson(res.data))
}

export const uploadImage = (file: FileModel, token: string): ImageModel => {
  const formData = new FormData()
  formData.append('image', file)
  return http.post(`${ API_URL }/media/image/upload`, formData, {
    headers: { Authorization: `Bearer ${ token }` },
  }).then(res => new ImageModel(res.data))
}

export const uploadAttachment = (file: FileModel, token: string): AttachmentModel => {
  const formData = new FormData()
  formData.append('file', file)
  return http.post(`${ API_URL }/media/file/upload`, formData, {
    headers: { Authorization: `Bearer ${ token }` },
  }).then(res => new AttachmentModel(res.data))
}

export const submitProfilePersonal = (form, token: string): ProfileModel => http.post(`${ API_URL }/security/me/profile/level1`, form, {
  headers: { Authorization: `Bearer ${ token }` },
}).then(res => ProfileModel.fromJson(res.data))

export const submitProfileContacts = (form, token: string): ProfileModel => http.post(`${ API_URL }/security/me/profile/level2`, form, {
  headers: { Authorization: `Bearer ${ token }` },
}).then(res => ProfileModel.fromJson(res.data))

export const submitProfilePassport = (form, token: string): ProfileModel => http.post(`${ API_URL }/security/me/profile/level3`, form, {
  headers: { Authorization: `Bearer ${ token }` },
}).then(res => ProfileModel.fromJson(res.data))

export const submitProfileLocation = (form, token: string): ProfileModel => http.post(`${ API_URL }/security/me/profile/level4`, form, {
  headers: { Authorization: `Bearer ${ token }` },
}).then(res => ProfileModel.fromJson(res.data))

export const resendEmailCode = (token: string): ProfileModel => http.post(`${ API_URL }/security/me/profile/level2/validate/email`, null, {
  headers: { Authorization: `Bearer ${ token }` },
}).then(res => ProfileModel.fromJson(res.data))

export const resendPhoneCode = (token: string): ProfileModel => http.post(`${ API_URL }/security/me/profile/level2/validate/phone`, null, {
  headers: { Authorization: `Bearer ${ token }` },
}).then(res => ProfileModel.fromJson(res.data))

export const confirmProfileContacts = (form, token: string): { profile: ProfileModel } => http.post(
  `${ API_URL }/security/me/profile/level2/confirm`,
  form,
  { headers: { Authorization: `Bearer ${ token }` } }
).then(res => ({ profile: ProfileModel.fromJson(res.data.profile) }))

export const submitClientProfile = (form, token: string): ProfileClientModel => {
  return http.post(`${ API_URL }/security/me/profile/client`, form, {
    headers: { Authorization: `Bearer ${ token }` },
  }).then(res => ProfileClientModel.fromJson(res.data))
}

export const reviewClientProfile = (token: string): ProfileClientModel => {
  return http.get(`${ API_URL }/security/me/profile/client`, {
    headers: { Authorization: `Bearer ${ token }` },
  }).then(res => ProfileClientModel.fromJson(res.data))
}

export const submitWorkerProfile = (workerProfile, token: string): { profile: ProfileWorkerModel } => http.post(
  `${ API_URL }/security/me/profile/worker`,
  workerProfile,
  { headers: { Authorization: `Bearer ${ token }` } }
).then(res => ({ profile: ProfileWorkerModel.fromJson(res.data) }))

export const getMeWorkerProfile = (token: string): { profile: ProfileWorkerModel } => http.get(
  `${ API_URL }/security/me/profile/worker`,
  { headers: { Authorization: `Bearer ${ token }` } }
).then(res => {
  return ({ profile: ProfileWorkerModel.fromJson(res.data) })
})

export const getProfile = (address: string): { profile: ProfileModel } => http.get(
  `${ API_URL }/security/profile`,
  { params: { address } }
).then(res => {
  return (ProfileModel.fromJson(res.data))
})

export const getServiceCategories = () => http.get(
  `${ API_URL }/security/worker/serviceCategories`,
).then(res => {
  return (res.data)
})

export const getCurrencies = () => http.get(
  `${ API_URL }/security/worker/currencies`,
).then(res => {
  return (res.data)
})
