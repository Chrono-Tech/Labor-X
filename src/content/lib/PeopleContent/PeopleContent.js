import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import SwipeableViews from 'react-swipeable-views'

import PersonModel from 'src/api/backend/model/PersonModel'
import { Icon } from 'src/components/common'

import PeopleTabContent from './PeopleTabContent/PeopleTabContent'
import css from './PeopleContent.scss'

const TAB_CLASSES = {
  root: css.tab,
  selected: css.tabActive,
}

class PeopleContent extends React.Component {
  static propTypes = {
    workers: PropTypes.arrayOf(PropTypes.instanceOf(PersonModel)),
    clients: PropTypes.arrayOf(PropTypes.instanceOf(PersonModel)),
    recruiters: PropTypes.arrayOf(PropTypes.instanceOf(PersonModel)),
  }

  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0,
    }
  }

  handleChangeIndex = (index) => this.setState({ slideIndex: index })
  handleTabChange = (e, index) => this.setState({ slideIndex: index })

  render () {
    const { workers, clients, recruiters } = this.props

    return (
      <div className={css.main}>
        <div className={css.title}>
          <Tabs
            onChange={this.handleTabChange}
            value={this.state.slideIndex}
            indicatorColor='primary'
          >
            <Tab classes={TAB_CLASSES} label='ALL' value={0} />
            <Tab classes={TAB_CLASSES} label='WORKERS' value={1} />
            <Tab classes={TAB_CLASSES} label='CLIENTS' value={2} />
            <Tab classes={TAB_CLASSES} label='RECRUITERS' value={3} />
          </Tabs>
        </div>
        <div className={css.content}>
          <div className={css.searchContainer}>
            <TextField
              fullwidth
              className={css.searchInput}
              name='people-search'
              placeholder='Search by keyword'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon size={24} icon={Icon.ICONS.SEARCH} color={Icon.COLORS.BLACK} />
                  </InputAdornment>
                ),
              }}
            />
            <div className={css.currentFilterContainer}>
              <div className={css.filterText}>Sydney, Building, Industrial</div>
              <Icon size={24} icon={Icon.ICONS.FILTER} color={Icon.COLORS.GREY50} />
            </div>
          </div>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChangeIndex}
          >
            <PeopleTabContent persons={[...workers, ...clients, ...recruiters]} />
            <PeopleTabContent persons={workers} />
            <PeopleTabContent persons={clients} />
            <PeopleTabContent persons={recruiters} />
          </SwipeableViews>
        </div>
      </div>
    )
  }
}

function mapStateToProps (/*state*/) {
  return {
    workers: [],
    clients: [],
    recruiters: [],
  }
}

export default connect(mapStateToProps)(PeopleContent)
