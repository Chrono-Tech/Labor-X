import React from 'react'
import { Translate, Tab } from 'components/common'
import uniqid from 'uniqid'
import ValidationTab from './ValidationTab/ValidationTab'
import NotificationsTab from './NotificationsTab/NotificationsTab'
import SecurityTab from './SecurityTab/SecurityTab'
import css from './MyProfile.scss'

export default class MyProfile extends React.Component {
  constructor (props, context){
    super(props, context)
    this.handleTabClick = this.handleTabClick.bind(this)

    this.state = {
      currentTab: 0,
      tabs: [
        {
          title: 'nav.validation',
          content: <ValidationTab />,
        },
        {
          title: 'nav.notifications',
          content: <NotificationsTab />,
        },
        {
          title: 'nav.security',
          content: <SecurityTab />,
        },
      ],
    }
  }

  handleTabClick (index) {
    this.setState({ currentTab: index })
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.myProfile' /></div>
          <div className={css.tabs}>
            {this.state.tabs.map((tab, index) => (
              <Tab
                key={uniqid()}
                className={css.tab}
                classActive={css.tabActive}
                isActive={this.state.currentTab === index}
                onClick={this.handleTabClick}
                title={tab.title}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className={css.content}>
          {this.state.tabs[this.state.currentTab].content}
        </div>
      </div>
    )
  }
}
