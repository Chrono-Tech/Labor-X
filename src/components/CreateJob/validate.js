import { required } from 'models/validator'

export default (values) => {
  return {
    intro: required(values.intro),
    responsibilities: required(values.responsibilities),
    workerRequirements: required(values.workerRequirements),
    conclusion: required(values.conclusion),
  }
}
