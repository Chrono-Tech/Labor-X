import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Widget } from 'src/components/common'
import {
  getClientTodoJobs,
  clientTodoJobsSelector,
} from 'src/store/dashboard'
import { SignerModel, JobModel } from 'src/models'
import css from './ForClientsWidget.scss'

export class ForClientsWidget extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel).isRequired,
    getClientTodoJobs: PropTypes.func.isRequired,
    clientTodoJobs: PropTypes.arrayOf(PropTypes.instanceOf(JobModel)),
  }

  componentDidMount () {
    this.props.getClientTodoJobs()
  }

  render () {
    const { clientTodoJobs, signer } = this.props
    return signer && (
      <div className={css.main}>
        <div className={css.row}>
          <Widget
            title='ui.dashboard.client.postYourJob'
            subtitle='ui.dashboard.client.client'
            actions={[
              {
                href: '/',
                label: 'Learn more',
                isLink: true,
              },
            ]}
          >
              Has got a Job already? Post it now!
          </Widget>
          <Widget
            title='ui.dashboard.client.myPostedJobs'
            subtitle='ui.dashboard.client.client'
            actions={[
              {
                label: 'Offers Activity',
                counter: { value: 1 },
                isLink: true,
              },
              {
                label: 'Worker Assignments Review',
                counter: { value: 1 },
                isLink: true,
              },
            ]}
          />
        </div>
        { clientTodoJobs.length > 0 ? (
          <div className={css.row}>
            <Widget
              title='ui.dashboard.client.jobsProgress'
              subtitle='ui.dashboard.client.client'
              actions={
                clientTodoJobs.map(job => ({
                  href: '/',
                  label: job.ipfs.name,
                  counter: { value: job.progress, isPercent: true },
                }))
              }
            />
          </div>
        ) : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const clientTodoJobs = clientTodoJobsSelector(state)
  return {
    clientTodoJobs: clientTodoJobs || [],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getClientTodoJobs: () => dispatch(getClientTodoJobs(ownProps.signer.address)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForClientsWidget)
