import React from 'react'
import JobPostForm from 'components/Jobs/JobPostForm/JobPostForm'

export default class JobPost extends React.Component {

  handleSubmitSuccess = (values) => {
    console.log('--JobPost#handleSubmitSuccess', values)
  }

  render () {
    return (
      <JobPostForm
        onSubmitSuccess={this.handleSubmitSuccess}
      />
    )
  }
}
