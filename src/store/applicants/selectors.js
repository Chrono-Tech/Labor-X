import { createSelector } from 'reselect'

export const applicantsSelector = () => (state) => state.applicants

export const jobsApplicantsSelector = (jobId) => createSelector(
  applicantsSelector(),
  (applicants) => applicants.byJobKey[`job-${jobId}`]
)
