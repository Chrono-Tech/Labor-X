import { currentAddressSelector } from "src/store"
import { daoByType } from "src/store";
import { JOB_STATE_OFFER_ACCEPTED } from "src/models/app/JobStateModel";
export const SELECT_INITIAL_PROPS_REQUEST = 'APPLICATIONS/SELECT_INITIAL_PROPS/REQUEST'
export const SELECT_INITIAL_PROPS_SUCCESS = 'APPLICATIONS/SELECT_INITIAL_PROPS/SUCCESS'
export const SELECT_INITIAL_PROPS_FAILURE = 'APPLICATIONS/SELECT_INITIAL_PROPS/FAILURE'
export const selectInitialPropsRequest = (req) => ({ type: SELECT_INITIAL_PROPS_REQUEST, payload: req })
export const selectInitialPropsSuccess = (res) => ({ type: SELECT_INITIAL_PROPS_SUCCESS, payload: res })
export const selectInitialPropsFailure = (err) => ({ type: SELECT_INITIAL_PROPS_FAILURE, payload: err })
export const selectInitialProps = () => async (dispatch, getState) => {
  try {
    dispatch(selectInitialPropsRequest())
    const state = getState()
    const JobsDataProvider = daoByType('JobsDataProvider')(state)
    const BoardController = daoByType('BoardController')(state)
    const userAddress = currentAddressSelector()(state)

    const jobs = (await JobsDataProvider.getJobs(BoardController)).filter((x) => x.boardId)
    const boards = await BoardController.getBoards(userAddress)
    const offers = await Promise.all(jobs.map((x) => JobsDataProvider.getJobOffers(x.id)))
    const myOffers = []
    .concat(...offers)
    .filter((x) => x.worker === userAddress)

    const applications = myOffers
      //Create the applicant cards
      .map((offer) => {
        const job = jobs.find(x => x.id === offer.jobId)
        const board = boards.find(x => x.id === job.boardId)
        if (job && board) {
          return {
            board,
            job,
            offer,
          }
        }
      })
      //Remove empty items
      .filter(x => x)

    const cards = applications
      //Filter offers for which there is no confirmation yet
      .filter((x) => x.job.worker !== x.offer.worker)
      .map(x => {
        return {
          ...x,
          notice: {
            label: 'UPD',
            description: 'Get Started has picked you to do this job! Please review contract and we will send notification about your decision to the client.',
            date: new Date(x.offer.createdAt.toNumber()*1000),
          },
        }
      })

    const cardsApproved = applications
      .filter(x => x.job.state === JOB_STATE_OFFER_ACCEPTED)
      .map(x => {
        return {
          ...x,
          notice: {
            label: 'ON REVIEW',
            description: 'Your application is under review. We will send you a notification once decision has been made.',
            date: new Date(x.offer.createdAt.toNumber()*1000),
          },
        }
      })

    dispatch(selectInitialPropsSuccess({ cards, cardsApproved }))
  } catch (err) {
    dispatch(selectInitialPropsFailure(err))
  }
}
