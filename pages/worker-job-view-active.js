import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import get from "lodash/get"
import { WorkerJobViewActiveContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class WorkerJobViewActivePage extends React.Component {

  static propTypes = {
    selectInitialProps: PropTypes.func.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    // const jobId = Number(get(this, "props.match.params.id"));
    // this.props.selectInitialProps()
  }

  render () {
    return (
      <MainLayout title='nav.completedJobs'>
        {/* {this.props.selectInitialPropsLoading ? <PageContentLoader /> : <WorkerJobViewActiveContent />} */}
        <WorkerJobViewActiveContent />
      </MainLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  // selectInitialPropsLoading: getSelectInitialPropsLoading(state)
})

const mapDispatchToProps = (dispatch) => ({
  // selectInitialProps: () => dispatch(selectInitialProps())
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkerJobViewActivePage)
