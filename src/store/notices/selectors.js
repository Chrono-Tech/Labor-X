import { JobNoticeModel, NOTICE_TYPE_PROBLEM, NOTICE_TYPE_MESSAGE } from 'src/models'
import faker from 'faker'
import uniqid from 'uniqid'

export const newJobNoticeSelector = (address, jobId) => (/*state*/) => {
  const v = faker.random.number({ min: 0, max: 2 })
  return v < 1
    ? new JobNoticeModel({
      id: uniqid(),
      jobId,
      type: faker.random.arrayElement([
        NOTICE_TYPE_PROBLEM,
        NOTICE_TYPE_MESSAGE,
      ]),
      message: faker.lorem.sentence(),
    })
    : null
}
