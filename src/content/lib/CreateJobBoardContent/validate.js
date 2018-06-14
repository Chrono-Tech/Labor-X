import * as validators from 'src/utils/validator'

export default (values) => {

  const REQUIREMENTS_RATING = 1

  const nameError = validators.name(values.name)
  const searchCategoryError = validators.required(values.tagCategories)
  const feeError = validators.isDefined(values.fee)
  const lhusError = validators.required(values.lhus)
  const ratingRequirementsError = validators.isDefined(values.rating_requirements)
  const joinRequirementError = validators.isDefined(values.joinRequirement)

  return {
    name: nameError ? nameError : null,
    searchCategory: searchCategoryError ? searchCategoryError : null,
    fee: feeError  ? feeError : null,
    lhus: lhusError ? lhusError : null,
    rating_requirements: values.joinRequirement === REQUIREMENTS_RATING && ratingRequirementsError ? ratingRequirementsError : null,
    joinRequirement: joinRequirementError ? joinRequirementError : null,
  }
}
