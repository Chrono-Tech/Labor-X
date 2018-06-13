import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { TodoContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import { todoJobsSelector } from "src/store"
import { schemaFactory as jobSchemaFactory } from "src/models/app/JobModel"

const TODO = {
  feedbackCards: [
    {
      title: 'Move Stuff from A to B and C and D',
      jobName: 'Get Started Client',
      jobIcon: '/static/temp/get-started.png',
      recruiterName: 'Anna German Recruiter',
      recruiterIcon: '/static/temp/worker-3.jpg',
    },
  ],
}

class ToDoPage extends React.Component {
  static propTypes = {
    todoJobs: PropTypes.arrayOf(PropTypes.instanceOf(jobSchemaFactory())),
    resumeJobWork: PropTypes.func,
    pauseJobWork: PropTypes.func,
  }

  render () {
    return (
      <MainLayout jobName='nav.toDo'>
        <TodoContent {...TODO} todoJobs={this.props.todoJobs} />
      </MainLayout>
    )
  }
}

const mapStateToProps = state => ({
  todoJobs: todoJobsSelector()(state),
})

export default connect(mapStateToProps)(ToDoPage)
