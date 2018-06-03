import React from 'react'
import PropTypes from 'prop-types'
import { JobModel } from 'src/models'

export default class GeneralTab extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
  }

  render () {
    return (
      <div>
        GeneralTab content
      </div>
    )
  }
}
