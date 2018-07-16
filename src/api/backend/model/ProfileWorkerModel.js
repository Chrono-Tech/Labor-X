import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'
import ProfileWorkerSocialModel from './ProfileWorkerSocialModel'
import ProfileWorkerServiceModel from './ProfileWorkerServiceModel'
import ProfileWorkerEmploymentModel from './ProfileWorkerEmploymentModel'
import CurrencyModel from './CurrencyModel'
import AttachmentModel from './AttachmentModel'

const schemaFactory = () => ({
  id: PropTypes.string,
  approved: PropTypes.bool,
  isRequested: PropTypes.bool,
  regular: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.instanceOf(CurrencyModel)),
    hourlyCharge: PropTypes.string,
  }),
  verifiable: PropTypes.shape({
    intro: PropTypes.string,
    pageBackground: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.instanceOf(AttachmentModel)),
  }),
  custom: PropTypes.any,
  socials: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerSocialModel)),
  services: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerServiceModel)),
  employments: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerEmploymentModel)),
})

export default class ProfileWorkerModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }

  static fromJson (data) {
    let nameField
    if (data.approved)
    {nameField = "approved"}
    if (data.submitted)
    {nameField = "submitted"}
    if (nameField)
    {return new ProfileWorkerModel({
      approved: nameField === "approved" ? true : false,
      submitted: nameField === "submitted" ? true : false,
      regular: {
        currencies: data[nameField].regular.currencies.map(item => new CurrencyModel(item)),
        hourlyCharge: data[nameField].regular.hourlyCharge,
      },
      verifiable: {
        intro: data[nameField].verifiable.intro,
        pageBackground: data[nameField].verifiable.pageBackground,
        attachments: data[nameField].verifiable.attachments.map(item => new AttachmentModel(item)),
      },
      custom: data[nameField].custom,
      socials: data[nameField].socials.map(item => new ProfileWorkerSocialModel(item)),
      services: data[nameField].services.map(item => new ProfileWorkerServiceModel({
        name: item.name,
        category: 0,
        description: item.description,
        fee: item.fee,
        minFee: item.minFee,
        attachments: item.attachments ? item.attachments.map(item => new AttachmentModel(item)) : [],
      })),
      employments: data[nameField].employments.map(item => new ProfileWorkerEmploymentModel(item)),
    })}
    else
    {return new ProfileWorkerModel({})}
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    id: "",
    approved: false,
    isRequested: false,
    regular: {
      currencies: [],
      hourlyCharge: "",
    },
    verifiable: {
      intro: "",
      pageBackground: "",
      attachments: [],
    },
    custom: null,
    socials: [],
    services: [],
    employments: [],
  }, props)
}

