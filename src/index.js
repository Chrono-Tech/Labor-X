import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { createLogger } from "redux-logger"
import { reducer as formReducer } from "redux-form"
import { i18nReducer, syncTranslationWithStore, loadTranslations, setLocale } from "react-redux-i18n"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import { create } from "jss"
import JssProvider from "react-jss/lib/JssProvider"
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles"

import LandingPage from "pages/landing-page"
import LoginPage from "pages/login"
import CreateAccountPage from "pages/create-account"
import DashboardPage from "pages/dashboard"
import CreateJobPage from "pages/create-job"
import JobTypesPage from "pages/job-types"
import CreateJobBoardPage from "pages/create-job-board"
import PostedJobsPage from "pages/posted-jobs"
import ActiveJobsPage from "pages/active-jobs"
import JobsArchivePage from "pages/jobs-archive"
import MyWalletPage from "pages/my-wallet"
import ToDoPage from "pages/to-do"
import ApplicationsAndOffersPage from "pages/applications-and-offers"
import OpportunitiesPage from "pages/opportunities"
import CompletedJobsPage from "pages/completed-jobs"
import GeneralProfilePage from "pages/general-profile"
import WorkerProfilePage from "pages/worker-profile"
import ClientProfilePage from "pages/client-profile"
import OpportunityViewPage from "pages/opportunity-view"
import ClientJobViewPage from "pages/client-job-view"
import ClientStatsPage from "pages/client-stats"
import EarnActivityPointsPage from "pages/earn-activity-points"
import JobBoardsPage from "pages/job-boards"
import JobsPage from "pages/jobs"
import MyJobsBoardPage from "pages/my-jobs-boards"
import MyProfilePage from "pages/my-profile"
import RecruiterJobsPage from "pages/recruiter-jobs"
import ReportsAndClaimsPage from "pages/reports-and-claims"
import ReviewApplicantsPage from "pages/review-applicants"
import SavedPage from "pages/saved"
import SchedulePage from "pages/schedule"
import ValidationRequestsPage from "pages/validation-requests"
import WorkerResumePage from "pages/worker-resume"
import AuthorizationMethodsPage from "pages/authorization-methods"
import ForgotPasswordPage from "pages/forgot-password"
import CryptoEducationPage from "pages/crypto-education"
import OurNetworkPage from "pages/our-network"
import YourAccountPage from "pages/your-account"
import CryptoCurrenciesPage from "pages/crypto-currencies"
import LaborhourPage from "pages/laborhour"

import AccountPasswordPage from "pages/signup/account-password"
import CopyYourAccountPasswordPage from "pages/signup/copy-your-account-password"
import ConfirmBackUpPage from "pages/signup/confirm-back-up"
import YourWalletFilePage from "pages/signup/your-wallet-file"
import WelcomePage from "pages/signup/welcome"

import { initFrontend } from "src/store/bootstrap"
import web3Factory from "src/web3"
import { ModalStack } from 'src/partials'
import translations from 'src/i18n'
import {
  balances,
  boards,
  createAccount,
  daos,
  ethereum,
  generalProfile,
  dashboard,
  jobs,
  landing,
  login,
  modals,
  myWallet,
  offers,
  tokens,
  user,
  wallet,
  workerProfile,
  opportunityView,
  postedJobs,
  clientProfile,
  activeJobs,
  profiles,
  reviewApplicants,
  archiveJobs,
  completedJobs,
  applicationsAndOffers,
  signup,
} from "src/store/reducers"

import 'styles/globals/globals.scss'
import AuthRoute from "./components/routes/AuthRoute"

const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
jss.options.insertionPoint = "insertion-point-jss"

const history = createBrowserHistory()

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed:  true,
  serialize: true,
  predicate: () => typeof window !== 'undefined',
})

const web3 = typeof window !== 'undefined'
  ? web3Factory()
  : null

const reducer = combineReducers({
  form: formReducer,
  i18n: i18nReducer,
  login,
  landing,
  ethereum: ethereum({ web3 }),
  daos,
  tokens,
  boards,
  jobs,
  wallet: wallet({ web3 }),
  balances,
  createAccount,
  modals,
  user: user(),
  offers,
  dashboard,
  generalProfile,
  workerProfile,
  myWallet,
  profiles,
  opportunityView,
  postedJobs,
  clientProfile,
  activeJobs,
  reviewApplicants,
  archiveJobs,
  completedJobs,
  applicationsAndOffers,
  signup,
})

const store = createStore(
  connectRouter(history)(reducer),
  {},
  compose(
    applyMiddleware(routerMiddleware(history), thunk, loggerMiddleware),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

syncTranslationWithStore(store)

const persistor = persistStore(store, null, async () => {
  await store.dispatch(initFrontend(store)({ web3 }))
  store.dispatch(loadTranslations(translations))
  store.dispatch(setLocale('en'))
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading='Loading' persistor={persistor}>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <MuiThemeProvider>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <div>
                <ConnectedRouter history={history}>
                  <div>
                    <Switch>
                      <Route exact path='/' component={LandingPage} />
                      <Route exact path='/login' component={LoginPage} />
                      <Route exact path='/create-account' component={CreateAccountPage} />
                      <Route exact path='/dashboard' component={DashboardPage} />
                      <Route exact path='/job-types' component={JobTypesPage} />
                      <Route exact path='/create-job' component={CreateJobPage} />
                      <Route exact path='/create-job-board' component={CreateJobBoardPage} />
                      <Route exact path='/posted-jobs' component={PostedJobsPage} />
                      <Route exact path='/active-jobs' component={ActiveJobsPage} />
                      <Route exact path='/jobs-archive' component={JobsArchivePage} />
                      <Route exact path='/my-wallet' component={MyWalletPage} />
                      <Route exact path='/to-do' component={ToDoPage} />
                      <Route exact path='/applications-and-offers' component={ApplicationsAndOffersPage} />
                      <Route exact path='/opportunities' component={OpportunitiesPage} />
                      <Route exact path='/opportunity-view/:id' component={OpportunityViewPage} />
                      <Route exact path='/completed-jobs' component={CompletedJobsPage} />
                      <Route exact path='/general-profile' component={GeneralProfilePage} />
                      <Route exact path='/worker-profile' component={WorkerProfilePage} />
                      <Route exact path='/client-profile' component={ClientProfilePage} />
                      <Route exact path='/client-job-view/:id' component={ClientJobViewPage} />
                      <Route exact path='/client-stats' component={ClientStatsPage} />
                      <Route exact path='/earn-activity-points' component={EarnActivityPointsPage} />
                      <Route exact path='/job-boards' component={JobBoardsPage} />
                      <Route exact path='/jobs' component={JobsPage} />
                      <Route exact path='/my-jobs-boards' component={MyJobsBoardPage} />
                      <Route exact path='/my-profile' component={MyProfilePage} />
                      <Route exact path='/recruiter-jobs' component={RecruiterJobsPage} />
                      <Route exact path='/reports-and-claims' component={ReportsAndClaimsPage} />
                      <Route exact path='/review-applicants/:id' component={ReviewApplicantsPage} />
                      <Route exact path='/saved' component={SavedPage} />
                      <Route exact path='/schedule' component={SchedulePage} />
                      <Route exact path='/validation-requests' component={ValidationRequestsPage} />
                      <Route exact path='/worker-resume' component={WorkerResumePage} />
                      <Route exact path='/authorization-methods' component={AuthorizationMethodsPage} />
                      <Route exact path='/forgot-password' component={ForgotPasswordPage} />

                      <AuthRoute exact path='/crypto-education' component={CryptoEducationPage} />
                      <AuthRoute exact path='/our-network' component={OurNetworkPage} />
                      <AuthRoute exact path='/your-account' component={YourAccountPage} />
                      <AuthRoute exact path='/crypto-currencies' component={CryptoCurrenciesPage} />
                      <AuthRoute exact path='/laborhour' component={LaborhourPage} />

                      <AuthRoute exact path='/account-password' component={AccountPasswordPage} />
                      <AuthRoute exact path='/copy-your-account-password' component={CopyYourAccountPasswordPage} />
                      <AuthRoute exact path='/confirm-back-up' component={ConfirmBackUpPage} />
                      <AuthRoute exact path='/your-wallet-file' component={YourWalletFilePage} />
                      <AuthRoute exact path='/welcome' component={WelcomePage} />

                    </Switch>
                    <ModalStack />
                  </div>
                </ConnectedRouter>
              </div>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </JssProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )

})
