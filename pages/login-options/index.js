import withRedux from 'next-redux-wrapper'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'components/common'
import { LoginActions } from 'components/layouts'
import { SelectOption, LoginOptions } from 'components/Login'
import initialStore, {
  changeStep
} from 'store'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import ethereumService from '../../src/services/EthereumService'
import css from './index.scss'

class Index extends React.Component {
  static propTypes = {
    step: PropTypes.string,
    changeStep: PropTypes.func,
  }
  
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  componentWillMount () {
    ethereumService.start()
  }

  render () {
    const { step, changeStep } = this.props
    return (
      <div className={css.root}>
        <LoginActions contentClassName={css.contentGradient}>
          <LoginOptions/>
        </LoginActions>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    step: state.step
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeStep: (step) => dispatch(changeStep(step))
  }
}

export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(Index)
