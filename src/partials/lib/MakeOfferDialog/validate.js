import { notEmpty, required } from 'models/validator'

export default (values) => {
  return values.totalPrice ? {
    totalPrice: notEmpty(values.totalPrice),
  } : {
    totalBudget: notEmpty(values.totalBudget),
    totalHours: notEmpty(values.totalHours),
    startDate: required(values.startDate),
    endDate: required(values.endDate),
    startTime: required(values.startTime),
    description: notEmpty(values.description),
  }
}
