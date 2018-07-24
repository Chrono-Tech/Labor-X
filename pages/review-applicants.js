import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { JobModel } from 'src/models'
import { jobByIdSelector, isFrontendInitialized } from 'src/store'
import { ReviewApplicantsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class ReviewApplicants extends React.Component {
  static propTypes = {
    jobId: PropTypes.number,
    isInitialized: PropTypes.bool,
    job: PropTypes.instanceOf(JobModel),
  }

  static async getInitialProps ({ isServer, query }) {
    /*
    TODO: We may preload applicants on the server side, but it forces us to:
    1) properly transfer state from server to client (additional hook in storeFactory)
    2) add web3 subscription in the server initializer
    We can think about it in the future, not now.

    await Promise.all([
      await store.dispatch(reloadJobsApplicants(query.id))
    ])
    */
    return {
      jobId: Number(query.id),
      isServer,
    }
  }

  render () {
    const { job, isInitialized } = this.props
    return !job ? null : (
      <MainLayout title='nav.reviewApplicants'>
        {!isInitialized ? null : (
          <ReviewApplicantsContent job={job} />
        )}
      </MainLayout>
    )
  }
}

function mapStateToProps (state, op) {
  const job = jobByIdSelector(op.match.params.id)(state)
  const isInitialized = isFrontendInitialized()(state)
  return {
    job,
    isInitialized,
  }
}

export default connect(mapStateToProps)(ReviewApplicants)
