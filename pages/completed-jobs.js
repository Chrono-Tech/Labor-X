import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CompletedJobsContent from 'src/components/CompletedJobs/CompletedJobs'
import { MainLayout } from 'src/components/layouts'
import {getSelectInitialPropsLoading, selectInitialProps} from "../src/store/completedJobs";
import PageContentLoader from 'src/components/PageContentLoader'

class CompletedJobsPage extends React.Component {
  
  static propTypes = {
    selectInitialProps: PropTypes.func.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    this.props.selectInitialProps()
  }

  render () {
    return (
      <MainLayout title='nav.completedJobs'>
        { this.props.selectInitialPropsLoading ? <PageContentLoader /> : <CompletedJobsContent /> }
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

export default connect(mapStateToProps, mapDispatchToProps)(CompletedJobsPage)
