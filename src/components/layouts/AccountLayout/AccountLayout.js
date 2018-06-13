import React from 'react'
import ReactDOM from 'react-dom'
import Head from 'next/head'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Link } from 'components/common'
import 'styles/globals/globals.scss'
import css from './AccountLayout.scss'

export default class AccountLayout extends React.Component {
  constructor (props){
    super(props)

    this.state = {
      activePage: 0,
    }
  }

  navigateBack () {
    if (this.state.activePage - 1  >= 0) {
      this.setState({ activePage: this.state.activePage - 1 })
    }
  }

  navigateNext () {
    if (this.state.activePage + 1 <= this.props.children.length) {
      this.setState(
        { activePage: this.state.activePage + 1 },
        () => {
          const pagesWrapper = ReactDOM.findDOMNode(this.refs.pagesWrapper)
          pagesWrapper && pagesWrapper.scrollIntoView()
        })

    }
  }

  renderChildren (){
    const pageProps = {
      navigateBack: this.navigateBack.bind(this),
      navigateNext: this.navigateNext.bind(this),
    }

    return React.Children.map(this.props.children, (item, index) => {
      return this.state.activePage === index ? (
        <div key={index}>
          {
            React.cloneElement(item, {
              ...pageProps,
              onSubmitSuccess: async (props) => {
                item.props.onSubmitSuccess && await item.props.onSubmitSuccess(props)
                this.navigateNext(props)
              },
            })
          }
        </div>) : null
    })
  }

  render () {
    const { contentClassName, title } = this.props

    const contentClassNames = [css.main].concat(contentClassName)

    return (
      <div className={css.root}>
        <div className={css.contentWrapper}>
          <div className={css.header}>
            <div className={css.headerInner}>
              <Link href='/'>
                <img src='/static/images/svg/laborx-white.svg' alt='' />
              </Link>
            </div>
          </div>
          <div className={css.topSection}>

            <div className={css.topSectionBlock}>
              {
                this.state.activePage !== 0 ? (
                  <button onClick={this.navigateBack.bind(this)} className={css.backLink}>
                    <img src='/static/images/svg/back.svg' alt='' />
                  </button>) : null
              }

              <Link href='/' className={css.helpLink}>
                <img src='/static/images/svg/help-white.svg' alt='' />
              </Link>
              { title ? (<h1>{ title }</h1>) : null }
            </div>
          </div>
          <div ref='pagesWrapper' className={contentClassNames.join(' ')}>
            <ReactCSSTransitionGroup
              transitionName='slides'
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={2000}
              transitionAppear={false}
              transitionEnter
              transitionLeave={false}
            >
              { this.renderChildren() }
            </ReactCSSTransitionGroup>
          </div>
          <Link href='/' className={css.footerLogo}>
            <img src='/static/images/svg/laborx-caption.svg' alt='' />
          </Link>
        </div>
      </div>
    )
  }
}
