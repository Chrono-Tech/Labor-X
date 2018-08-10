import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

// import { WorkerStateModel, WORKER_STATE_AVALIABLE, WORKER_STATE_BUSY } from 'src/models'

import css from './TimeTrackerWidget.scss'

export default class TimeTrackerWidget extends React.Component {
  static propTypes = {
    classname: PropTypes.string,
  }

  render () {
    const { classname } = this.props
    return (
      <div className={cn(css.root, classname)}>
        TimeTrackerWidget
      </div>
    )
  }
}
