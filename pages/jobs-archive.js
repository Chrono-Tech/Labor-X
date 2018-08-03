import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ArchiveJobsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import { getSelectInitialPropsLoading, selectInitialProps } from "../src/store/archiveJobs";
import PageContentLoader from 'src/components/PageContentLoader'

class JobsArchivePage extends React.Component {
  static propTypes = {
    selectInitialProps: PropTypes.func.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    this.props.selectInitialProps()
  }

  render () {
    return (
      <MainLayout title='nav.jobsArchive'>
        { this.props.selectInitialPropsLoading ? <PageContentLoader /> : <ArchiveJobsContent /> }
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

export default connect(mapStateToProps, mapDispatchToProps)(JobsArchivePage)
