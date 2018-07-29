import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { PostedJobsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import {getSelectInitialPropsLoading, selectInitialProps} from "../src/store/postedJobs";
import PageContentLoader from 'src/components/PageContentLoader'



class PostedJobsPage extends React.Component {

  static propTypes = {
    selectInitialProps: PropTypes.func.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    this.props.selectInitialProps()
  }

  render () {
    return (
      <MainLayout title='nav.postedJobs'>
        { this.props.selectInitialPropsLoading ? <PageContentLoader /> : <PostedJobsContent /> }
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

export default connect(mapStateToProps, mapDispatchToProps)(PostedJobsPage)
