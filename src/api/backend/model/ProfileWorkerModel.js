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
    return new ProfileWorkerModel({
      regular: {
        currencies: data.submitted.regular.currencies.map(item => new CurrencyModel(item)),
        hourlyCharge: data.submitted.regular.hourlyCharge,
      },
      verifiable: {
        intro: data.submitted.verifiable.intro,
        pageBackground: data.submitted.verifiable.pageBackground,
        attachments: data.submitted.verifiable.attachments.map(item => new AttachmentModel(item)),
      },
      custom: data.submitted.custom,
      socials: data.submitted.socials.map(item => new ProfileWorkerSocialModel(item)),
      services: data.submitted.services.map(item => new ProfileWorkerServiceModel({
        name: item.name,
        category: 0,
        description: item.description,
        fee: item.fee,
        minFee: item.minFee,
        attachments: item.attachments.map(item => new AttachmentModel(item)),
      })),
      employments: data.submitted.employments.map(item => new ProfileWorkerEmploymentModel(item)),
    })
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

