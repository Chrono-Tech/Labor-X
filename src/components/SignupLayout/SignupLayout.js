import React from 'react'
import './../../styles/globals/globals.scss'
import css from './SignupLayout.scss'
export default () => (
  <div className={css.root}>
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
            {/*{*/}
            {/*this.state.activePage !== 0 ? (*/}
            {/*<button onClick={this.navigateBack.bind(this)} className={css.backLink}>*/}
            {/*<img src='/static/images/svg/back.svg' alt='' />*/}
            {/*</button>) : null*/}
            {/*}*/}
            {/*<Link href='/' className={css.helpLink}>*/}
            {/*<img src='/static/images/svg/help-white.svg' alt='' />*/}
            {/*</Link>*/}
            {/*{ title ? (<h1>{ title }</h1>) : null }*/}
          </div>
        </div>
        {/*<div ref='pagesWrapper' className={contentClassNames.join(' ')}>*/}
        {/*<ReactCSSTransitionGroup*/}
        {/*transitionName='slides'*/}
        {/*transitionEnterTimeout={1000}*/}
        {/*transitionLeaveTimeout={2000}*/}
        {/*transitionAppear={false}*/}
        {/*transitionEnter*/}
        {/*transitionLeave={false}*/}
        {/*>*/}
        {/*/!*{ this.renderChildren() }*!/*/}
        {/*</ReactCSSTransitionGroup>*/}
        {/*</div>*/}
        {/*<Link href='/' className={css.footerLogo}>*/}
        {/*<img src='/static/images/svg/laborx-caption.svg' alt='' />*/}
        {/*</Link>*/}
      </div>
    </div>
  </div>
)