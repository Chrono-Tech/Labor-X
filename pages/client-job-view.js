import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { JobModel } from 'src/models'
import { jobByIdSelector } from 'src/store'
import { ClientJobViewContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class ClientJobViewPage extends React.Component {

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
      <MainLayout title='nav.clientJobView'>
        <ClientJobViewContent job={job} />
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

export default connect(mapStateToProps)(ClientJobViewPage)
