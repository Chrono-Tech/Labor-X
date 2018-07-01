import { notEmpty, required, isValidNumber } from 'models/validator'

export default (values) => {
  return values.fixedPrice ? {
    fixedPrice: isValidNumber(values.fixedPrice),
  } : {
    totalBudget: notEmpty(values.totalBudget),
    totalHours: notEmpty(values.totalHours),
    startDate: required(values.startDate),
    endDate: required(values.endDate),
    startTime: required(values.startTime),
    description: notEmpty(values.description),
  }  
}
