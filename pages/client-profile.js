import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ClientProfileContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import PageContentLoader from 'src/components/PageContentLoader'
import { getSelectInitialPropsLoading, selectInitialProps } from "src/store/client-profile"

class ClientProfilePage extends React.Component {

  static propTypes = {
    selectInitialProps: PropTypes.func.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    this.props.selectInitialProps()
  }

  render () {
    return (
      <MainLayout title='nav.clientProfile'>
        { this.props.selectInitialPropsLoading ? <PageContentLoader /> : <ClientProfileContent /> }
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfilePage)
