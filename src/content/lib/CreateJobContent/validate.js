import { notEmpty } from 'models/validator'

export default (values) => {
  return {
    name: notEmpty(values.name),
    intro: notEmpty(values.intro),
    responsibilities: notEmpty(values.responsibilities),
    requirements: notEmpty(values.requirements),
    category: notEmpty(values.category),
    area: notEmpty(values.area),
    tags: notEmpty(values.tags),
    legal: notEmpty(values.legal),
    board: notEmpty(values.board),
    skills: notEmpty(values.skills),
    conclusion: notEmpty(values.conclusion),
    flowType: notEmpty(values.flowType),
    hourlyRating: notEmpty(values.hourlyRating),
  }
}
