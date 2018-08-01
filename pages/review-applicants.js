import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import get from "lodash/get"
import { ReviewApplicantsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import PageContentLoader from 'src/components/PageContentLoader'
import { getSelectInitialPropsLoading, selectInitialProps } from "../src/store/review-applicants"

class OpportunityViewPage extends React.Component {

  static propTypes = {
    selectInitialProps: PropTypes.func.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    this.props.selectInitialProps(Number(get(this, "props.match.params.id")))
  }

  render () {
    return (
      <MainLayout title='nav.opportunities'>
        { this.props.selectInitialPropsLoading ? <PageContentLoader /> : <ReviewApplicantsContent /> }
      </MainLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  selectInitialPropsLoading: getSelectInitialPropsLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
  selectInitialProps: (jobId) => dispatch(selectInitialProps(jobId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityViewPage)
