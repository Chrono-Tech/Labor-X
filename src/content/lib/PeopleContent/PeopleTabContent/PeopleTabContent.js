import React from 'react'
import PropTypes from 'prop-types'
import PersonModel from 'src/api/backend/model/PersonModel'
import css from './PeopleTabContent.scss'

export default class PeopleTabContent extends React.Component {
  static propTypes = {
    persons: PropTypes.arrayOf(PropTypes.instanceOf(PersonModel)),
  }

  render () {
    return (
      <div className={css.content}>
        Tab Content
      </div>
    )
  }
}
