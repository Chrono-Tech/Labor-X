import React from 'react'
import PropTypes from 'prop-types'

import PersonModel from 'src/api/backend/model/PersonModel'
import { PersonCard } from 'src/components/common'

import css from './PeopleTabContent.scss'

export default class PeopleTabContent extends React.Component {
  static propTypes = {
    persons: PropTypes.arrayOf(PropTypes.instanceOf(PersonModel)).isRequired,
  }

  render () {
    const { persons } = this.props
    return (
      <div className={css.content}>
        { persons.map(p => <PersonCard key={p.id} person={p} />) }
      </div>
    )
  }
}
