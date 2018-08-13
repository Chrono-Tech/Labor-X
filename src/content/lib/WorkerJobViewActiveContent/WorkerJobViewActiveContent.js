import React from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Image, Button, Icon } from 'src/components/common'
import DocsTab from './DocsTab/DocsTab'
import LogTab from './LogTab/LogTab'
import InfoTab from './InfoTab/InfoTab'
import InvoiceTab from './InvoiceTab/InvoiceTab'
import css from './WorkerJobViewActiveContent.scss'

export class WorkerJobViewActiveContent extends React.Component {
  static propTypes = {
  }

  state = {
    value: 0,
  }

  handleBack () {
    this.props.push('/posted-jobs')
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render () {
    const { value } = this.state
    return (
      <div className={css.main}>

        <div className={css.title}>
          <div className={css.titleBar}>
            <Button
              icon={{
                icon: Image.ICONS.ARROW_BACK,
                color: Image.COLORS.WHITE,
              }}
              className={css.backButton}
              mods={Button.MODS.FLAT}
              onClick={this.handleBack}
            />
          </div>
        </div>

        <div className={css.content}>

          <div className={cn(css.header, css.bgGreen)}>
            <div>
              <h2 className={css.jobName}>Install 10 Gas Ovens</h2>
              <div className={css.jobInfoContainer}>
                <p className={css.jobInfo}>Ref #J-AA-0001</p>
                <p className={css.jobInfo}>Get Started (Client)</p>
              </div>
            </div>

            <div className={css.jobMenu}>
              <Icon
                icon={Icon.ICONS.MORE}
                color={Icon.COLORS.WHITE}
                size={24}
              />
              <div className={css.jobDropdown}>
                <div className={css.jobDropdownEntry}>Edit</div>
                <div className={css.jobDropdownEntry}>View Public Page</div>
                <div className={css.jobDropdownEntry}>Terminate</div>
              </div>
            </div>

            <Icon
              className={css.messageIcon}
              icon={Icon.ICONS.MESSAGE}
              color={Icon.COLORS.WHITE}
              size={24}
            />
            <div className={css.appBarWrapper}>
              <AppBar className={css.appBar}>
                <Tabs value={value} onChange={this.handleChange} classes={{ root: css.tabsRoot,  indicator: css.tabsIndicator }}>
                  <Tab classes={{ root: css.tabRoot, selected: css.tabSelected }} label={<span className={css.activeTabText}>INFO</span>} />
                  <Tab classes={{ root: css.tabRoot, selected: css.tabSelected }} label={<span className={css.activeTabText}>LOG</span>} />
                  <Tab classes={{ root: css.tabRoot, selected: css.tabSelected }} label={<span className={css.activeTabText}>DOCS</span>} />
                  <Tab classes={{ root: css.tabRoot, selected: css.tabSelected }} label={<span className={css.activeTabText}>INVOICE</span>} />
                </Tabs>
              </AppBar>
            </div>
          </div>


          <div className={css.tabContent}>
            {
              value === 0 && (
                <InfoTab />
              )
            }
            {
              value === 1 && (
                <LogTab />
              )
            }
            {
              value === 2 && (
                <DocsTab />
              )
            }
            {
              value === 3 && (
                <InvoiceTab />
              )
            }
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state, op) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WorkerJobViewActiveContent)
