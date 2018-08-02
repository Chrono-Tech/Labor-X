// import React from 'react'
// import Link from 'react-router-dom/Link'
// import {submitWelcome as submit} from "../../../src/store/signup/actions";
// import connect from "react-redux/lib/connect/connect";
//
// let WelcomePage = (props) => <div>Welcome<button onClick={props.submit}>Done</button></div>
//
//
// // const mapStateToProps = (state) => ({
// //   isConfirmBackUpFormExists: isConfirmBackUpFormExistsSelector(state)
// // })
//
// const mapDispatchToProps = (dispatch) => ({
//   submit: () => dispatch(submit())
// })
//
// WelcomePage = connect(null, mapDispatchToProps)(WelcomePage)
//
// export default WelcomePage
//
//




import React  from 'react'
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'

import WelcomeContent from "../../../src/content/lib/signup/WelcomeContent/WelcomeContent";
import {isConfirmBackUpFormExistsSelector} from "../../../src/store/signup/selectors";

export class WelcomePage extends React.Component {

  render () {
    return this.props.isConfirmBackUpFormExists ? <WelcomeContent /> : <Redirect to='/account-password'/>
  }

}

const mapStateToProps = (state) => ({
  isConfirmBackUpFormExists: isConfirmBackUpFormExistsSelector(state)
})

WelcomePage = connect(mapStateToProps)(WelcomePage)

export default WelcomePage