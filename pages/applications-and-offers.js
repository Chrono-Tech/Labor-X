import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { MainLayout } from 'src/components/layouts'
import { ApplicationsAndOffersContent } from 'src/content'
import { getSelectInitialPropsLoading, selectInitialProps } from "../src/store/applicationsAndOffers";
import PageContentLoader from 'src/components/PageContentLoader'

class ApplicationsAndOffers extends React.Component {

  static propTypes = {
    selectInitialProps: PropTypes.func.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    this.props.selectInitialProps()
  }

  render () {
    return (
      <MainLayout title='nav.applicationsAndOffers'>
       { this.props.selectInitialPropsLoading ? <PageContentLoader /> : <ApplicationsAndOffersContent /> }
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
