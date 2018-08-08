import React from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { CreateJobContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import PageContentLoader from 'src/components/PageContentLoader'
import { getSelectInitialPropsLoading, selectInitialProps } from "src/store/createJob";

class CreateJobPage extends React.Component {
  
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
        { this.props.selectInitialPropsLoading ? <PageContentLoader /> : <CreateJobContent /> }
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobPage)
