import React from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import JobBoards from 'src/components/JobBoards/JobBoards'
import { MainLayout } from 'src/components/layouts'
import { getSelectInitialPropsLoading, selectInitialProps } from "src/store/jobBoards";
import PageContentLoader from 'src/components/PageContentLoader'


class JobBoardsPage extends React.Component {

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
        { this.props.selectInitialPropsLoading ? <PageContentLoader /> : <JobBoards /> }
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

export default connect(mapStateToProps, mapDispatchToProps)(JobBoardsPage)
