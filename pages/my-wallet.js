import React from 'react'
import { connect } from 'react-redux'
import MyWalletContent from 'src/content/lib/MyWalletContent/MyWalletContent'
import { MainLayout } from 'src/components/layouts'
// import {currentAddressSelector} from "../src/store";
import {selectInitialProps} from "../src/store/my-wallet/actions";
import {getSelectInitialPropsLoading} from "../src/store/my-wallet/selectors";
import CircularProgress from '@material-ui/core/CircularProgress'

class MyWalletPage extends React.Component {

  componentDidMount () {
    this.props.selectInitialProps()
  }

  render () {
    return (
      <MainLayout title='nav.myProfile'>
        {/*{ this.props.user ? <MyWalletContent /> : null }*/}
        { this.props.selectInitialPropsLoading ? <CircularProgress /> : <MyWalletContent /> }
      </MainLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: currentAddressSelector()(state),
  selectInitialPropsLoading: getSelectInitialPropsLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
  // user: currentAddressSelector()(state),
  selectInitialProps: () => dispatch(selectInitialProps()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletPage)
