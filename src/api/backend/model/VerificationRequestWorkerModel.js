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
    // console.log(form)
    // return new VerificationRequestWorkerModel({
    //   regular: {
    //     currencies: [
    //       ...(form.currencyLhus ? ["LHUS"] : []),
    //       ...(form.currencyBitcoin ? ["BTC"] : [])
    //     ], // symbols, not ids
    //     hourlyCharge: form.hourlyCharge,
    //   },
    //   verifiable: {
    //     intro: form.intro,
    //     pageBackground: "5b48d9b5dc95100958724ed9",
    //     attachments: ["5b48d9b5dc95100958724ed9"],
    //   },
    //   custom: {
    //     "schedule": {
    //       "thu": true,
    //       "wed": true,
    //       "tue": true,
    //       "mon": true
    //     }
    //   },
    //   socials: [
    //     new VerificationRequestWorkerSocialModel({
    //       name: "Linkedin",
    //       url: form.linkedin ? form.linkedin : ""
    //     }),
    //     new VerificationRequestWorkerSocialModel({
    //       name: "Facebook",
    //       url: form.facebook ? form.facebook : ""
    //     }),
    //     new VerificationRequestWorkerSocialModel({
    //       name: "Twitter",
    //       url: form.twitter ? form.twitter : ""
    //     }),
    //   ],
    //   services: form.services.map(item => new VerificationRequestWorkerServiceModel({
    //     name: item.name,
    //     category: 1, // category code
    //     description: "empty",
    //     fee: String(item.fee),
    //     minFee: item.feeFrom,
    //     attachments: null
    //   })
    //   ),
    //   employments: form.experiences.map(item => new VerificationRequestWorkerEmploymentModel({
    //     organization: item.organisation,
    //     since: item.workFrom,
    //     until: item.workTo,
    //     responsibilities: item.responsibilities
    //   }))
    // });
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





