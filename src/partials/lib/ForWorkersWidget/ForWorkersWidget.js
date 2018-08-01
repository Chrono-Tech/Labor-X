import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Widget } from 'src/components/common'
import {
  getWorkerTodoJobs,
  workerTodoJobsLoadingSelector,
  workerTodoJobsFailureSelector,
  workerTodoJobsSelector,
} from 'src/store/dashboard'
import { SignerModel } from 'src/models'
import css from './ForWorkersWidget.scss'

export class ForWorkersWidget extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel).isRequired,
    getWorkerTodoJobs: PropTypes.func.isRequired,
    workerTodoJobsLoading: PropTypes.bool,
    workerTodoJobsFailure: PropTypes.instanceOf(Error),
    workerTodoJobs: PropTypes.arrayOf(PropTypes.object),
  }

  componentDidMount () {
    this.props.getWorkerTodoJobs()
  }

  render () {
    return this.props.signer && (
      <div className={css.main}>
        <div className={css.row}>
          <Widget
            title='ui.dashboard.worker.startYourJobSearch'
            subtitle='ui.dashboard.worker.worker'
            actions={[
              {
                href: '/general-job-board',
                label: 'Visit general job board',
                isLink: true,
              },
              {
                href: '/job-boards',
                label: 'Browse job boards',
                isLink: true,
              },
            ]}
          >
            You may visit our General Job Board and start your search or
            browse Job Boards created by other network users.
          </Widget>
          <Widget
            title='ui.dashboard.worker.toDo'
            subtitle='ui.dashboard.worker.worker'
            actions={[
              {
                label: 'Install 10 Gas Ovens',
                date: '10:30 PM',
                isLink: true,

              },
              {
                label: 'Pick-up 3 sofas',
                date: '7:30 PM',
                isLink: true,

              },
            ]}
          />
        </div>
        <div className={css.row}>
          <Widget
            href='/opportunities'
            title='ui.dashboard.worker.opportunities'
            subtitle='ui.dashboard.worker.worker'
            actions={[
              {
                href: '/opportunities',
                label: 'Opportunities',
                counter: { value: 135 },
                isLink: true,
              },
              {
                label: 'Offers',
                counter: { value: 3 },
                isLink: true,
              },
              {
                label: 'Applications',
                isLink: true,
              },
            ]}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  workerTodoJobsLoading: workerTodoJobsLoadingSelector(state),
  workerTodoJobsFailure: workerTodoJobsFailureSelector(state),
  workerTodoJobs: workerTodoJobsSelector(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getWorkerTodoJobs: () => dispatch(getWorkerTodoJobs(ownProps.signer.address)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForWorkersWidget)
