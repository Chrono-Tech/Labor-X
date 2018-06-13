import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { JobModel } from 'src/models'
import { jobByIdSelector } from 'src/store'
import { OpportunityViewContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class OpportunityViewPage extends React.Component {

  static propTypes = {
    job: PropTypes.instanceOf(JobModel),
  }

  static async getInitialProps ({ isServer, query }) {
    return {
      jobId: query.id,
      isServer,
    }
  }

  render () {
    const { job } = this.props
    return !job ? null : (
      <MainLayout title='nav.opportunities'>
        <OpportunityViewContent job={job} />
      </MainLayout>
    )
  }
}

function mapStateToProps (state, op) {
  const job = jobByIdSelector(op.jobId)(state)
  return {
    job,
  }
}

export default connect(mapStateToProps)(OpportunityViewPage)
