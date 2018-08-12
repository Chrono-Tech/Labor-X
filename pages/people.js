import React from 'react'

import { MainLayout } from 'src/components/layouts'
import { PeopleContent } from 'src/content'

export default class PeoplePage extends React.Component {

  render () {
    return (
      <MainLayout isMenu={false} title='nav.people'>
        <PeopleContent />
      </MainLayout>
    )
  }
}
