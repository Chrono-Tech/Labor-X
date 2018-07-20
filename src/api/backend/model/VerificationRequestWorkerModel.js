import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
  regular: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string), // symbols, not ids
    hourlyCharge: PropTypes.string,
  }),
  verifiable: PropTypes.shape({
    intro: PropTypes.string,
    pageBackground: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.string),
  }),
  custom: PropTypes.any,
  socials: PropTypes.arrayOf(PropTypes.instanceOf(VerificationRequestWorkerSocialModel)),
  services: PropTypes.arrayOf(PropTypes.instanceOf(VerificationRequestWorkerServiceModel)),
  employments: PropTypes.arrayOf(PropTypes.instanceOf(VerificationRequestWorkerEmploymentModel)),
})

export default class VerificationRequestWorkerModel extends AbstractModel {
  constructor(props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static fromJson(form) {
  }
}

const schemaFactorySocialModel = () => ({
  name: PropTypes.string.isRequired, // symbols, not ids
  url: PropTypes.string.isRequired,
})

export class VerificationRequestWorkerSocialModel extends AbstractModel {
  constructor(props) {
    super(props, schemaFactorySocialModel())
    Object.freeze(this)
  }

  static fromJson(data) {
    return data;
  }
}

const schemaFactoryServiceModel = () => ({
  name: PropTypes.string.isRequired,
  category: PropTypes.number.isRequired, // category code
  description: PropTypes.string,
  fee: PropTypes.string,
  minFee: PropTypes.string,
  attachments: PropTypes.arrayOf(PropTypes.string)
})

export class VerificationRequestWorkerServiceModel extends AbstractModel {
  constructor(props) {
    super(props, schemaFactoryServiceModel())
    Object.freeze(this)
  }

  static fromJson(data) {
    return data;
  }
}

const schemaFactoryEmploymentModel = () => ({
  organization: PropTypes.string,
  since: PropTypes.instanceOf(Date),
  until: PropTypes.instanceOf(Date),
  responsibilities: PropTypes.string
})


export class VerificationRequestWorkerEmploymentModel extends AbstractModel {
  constructor(props) {
    super(props, schemaFactoryEmploymentModel())
    Object.freeze(this)
  }

  static fromJson(data) {
    return data;
  }
}





