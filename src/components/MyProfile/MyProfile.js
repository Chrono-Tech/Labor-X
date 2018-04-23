import { Translate } from 'components/common'
import ValidationTab from './ValidationTab/ValidationTab'
import React from 'react'
import css from './MyProfile.scss'

export default class MyProfile extends React.Component {

  constructor(props, context){
    super(props, context)
    this.state = {
      currentTab: 0,
      tabs: [
        {
          title: 'nav.validation',
          content: <ValidationTab />,
        },
        {
          title: 'nav.notifications',
          content: <div>Notifications tab content</div>,
        },
        {
          title: 'nav.security',
          content: <div>Security tab content</div>,
        },
      ]
    }
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.myProfile' /></div>
          <div className={css.tabs}>
            {this.state.tabs.map((tab, index) =>
              <div
                className={[css.tab, this.state.currentTab === index ? css.tabActive : null].join(' ')}
                onClick={() => this.setState({currentTab: index})}
                key={tab.title}
              >
                <Translate value={tab.title} />
              </div>
            )}
          </div>
        </div>
        <div className={css.content}>
          {this.state.tabs[this.state.currentTab].content}
        </div>
      </div>
    )
  }
}
