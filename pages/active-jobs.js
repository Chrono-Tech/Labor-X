import React from 'react'
import { connect } from 'react-redux'
import { ActiveJobsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import PageContentLoader from 'src/components/PageContentLoader'

import {getSelectInitialPropsLoading, selectInitialProps} from "src/store/activeJobs";
import PropTypes from "prop-types";

class ActiveJobsPage extends React.Component {

  static propTypes = {
    selectInitialProps: PropTypes.func.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    this.props.selectInitialProps()
  }

  render () {
    return (
      <MainLayout title='nav.activeJobs'>
        { this.props.selectInitialPropsLoading ? <PageContentLoader /> : <ActiveJobsContent /> }
      </MainLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  selectInitialPropsLoading: getSelectInitialPropsLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
  selectInitialProps: () => dispatch(selectInitialProps()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobsPage)
