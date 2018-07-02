import * as validators from 'src/utils/validator'

// eslint-disable-next-line complexity
export default (values) => {

  const REQUIREMENTS_RATING = 1

  const nameError = validators.name(values.name)
  const feeError = validators.isDefined(values.fee)
  const lhusError = validators.required(values.lhus)
  const ratingRequirementsError = validators.isDefined(values.ratingRequirements)
  const verificationRequirementsError = validators.isDefined(values.verificationRequirements)
  const joinRequirementError = validators.isDefined(values.joinRequirement)
  const tagsCategoryError = validators.isDefined(values.tagsCategory)
  const tagsAreaError = validators.isDefined(values.tagsArea)
  const tagsError = validators.notEmptyArray(values.tags)

  return {
    name: nameError ? nameError : null,
    fee: feeError  ? feeError : null,
    lhus: lhusError ? lhusError : null,
    ratingRequirements: values.joinRequirement === REQUIREMENTS_RATING && ratingRequirementsError ? ratingRequirementsError : null,
    verificationRequirements: values.joinRequirement === REQUIREMENTS_RATING && verificationRequirementsError ? verificationRequirementsError : null,
    joinRequirement: joinRequirementError ? joinRequirementError : null,
    tagsCategory: tagsCategoryError ? tagsCategoryError : null,
    tagsArea: tagsAreaError ? tagsAreaError : null,
    tags: tagsError ? 'Please pick at least one skill' : null,
  }
}
