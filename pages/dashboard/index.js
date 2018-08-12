import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { DashboardContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import PageContentLoader from 'src/components/PageContentLoader'
import { signerSelector } from 'src/store'
import ProfileModel from 'src/api/backend/model/ProfileModel'
import ProfileClientModel from 'src/api/backend/model/ProfileClientModel'
import ProfileWorkerModel from 'src/api/backend/model/ProfileWorkerModel'
import ProfileRecruiterModel from 'src/api/backend/model/ProfileRecruiterModel'
import { SignerModel, UserModel } from 'src/models'
import {
  getPageData,
  pageDataLoadingSelector,
  pageDataFailureSelector,
  pageDataSelector,
} from 'src/store/dashboard'
import { userSelector } from 'src/store/user/selectors'
import css from './index.pcss'

class DashboardPage extends React.Component {
  static propTypes = {
    getPageData: PropTypes.func.isRequired,
    pageDataLoading: PropTypes.bool.isRequired,
    pageDataFailure: PropTypes.instanceOf(Error),
    user: PropTypes.instanceOf(UserModel).isRequired,
    signer: PropTypes.instanceOf(SignerModel).isRequired,
    pageData: PropTypes.shape({
      profile:  PropTypes.shape({
        profile: PropTypes.instanceOf(ProfileModel),
        client: PropTypes.instanceOf(ProfileClientModel),
        worker: PropTypes.instanceOf(ProfileWorkerModel),
        recruiter: PropTypes.instanceOf(ProfileRecruiterModel),
      }).isRequired,
    }),
  }
  componentDidMount () {
    this.props.getPageData()
  }
   reloadPage = () => {
     document && document.location.reload(true)
   }
   renderError = () => (
     <div className={css.contentError}>
       <h3>Error loading data</h3>
       <Button className={css.buttonReload} onClick={this.reloadPage}>Reload page</Button>
     </div>
   )
   render () {
     const { signer, user, pageData, pageDataFailure, pageDataLoading } = this.props
     return (
       <MainLayout title='nav.dashboard'>
         { signer == null || pageDataLoading
           ? <PageContentLoader />
           : pageDataFailure
             ? this.renderError()
             : <DashboardContent signer={signer} user={user} pageData={pageData} /> }
       </MainLayout>
     )
   }
}
const mapStateToProps = (state) => ({
  signer: signerSelector()(state),
  user: userSelector()(state),
  pageDataLoading: pageDataLoadingSelector(state),
  pageDataFailure: pageDataFailureSelector(state),
  pageData: pageDataSelector(state),
})
const mapDispatchToProps = (dispatch) => ({
  getPageData: () => dispatch(getPageData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
