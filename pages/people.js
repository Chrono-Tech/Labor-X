import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { MainLayout } from 'src/components/layouts'
import { PeopleContent } from 'src/content'
import { getSelectInitialPropsLoading, selectInitialProps } from "../src/store/applicationsAndOffers";
import PageContentLoader from 'src/components/PageContentLoader'

class ApplicationsAndOffers extends React.Component {

  static propTypes = {
    selectInitialProps: PropTypes.func.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
  }

  // componentDidMount () {
  //   this.props.selectInitialProps()
  // }

  render () {
    return (
      <MainLayout isMenu={false} title='nav.people'>
       {/* { this.props.selectInitialPropsLoading ? <PageContentLoader /> : <PeopleContent /> } */}
       <PeopleContent />
      </MainLayout>
    )
  }
}
const mapStateToProps = (state) => ({
  selectInitialPropsLoading: getSelectInitialPropsLoading(state)
})

const mapDispatchToProps = (dispatch) => ({
  selectInitialProps: () => dispatch(selectInitialProps())
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsAndOffers)
