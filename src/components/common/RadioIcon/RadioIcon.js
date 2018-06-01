import PropTypes from 'prop-types'
import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import Checkbox from 'material-ui/Checkbox'

import css from './RadioIcon.scss'

export default class RadioIcon extends React.Component {
  static propTypes = {
    radioButtonClassName: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    checkedIcon: PropTypes.node,
    uncheckedIcon: PropTypes.node,
    values: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    })),
    material: PropTypes.bool,
  }

  static defaultProps = {
    label: null,
    material: false,
    values: [],
  }

  constructor (props) {
    super(props)

    this.state = {
      currentValue: 0,
    }
  }

  handleOnChange = (e, i) => {
    this.setState({
      currentValue: i,
    })
  }

  renderButtons () {
    const { values, checkedIcon, uncheckedIcon } = this.props

    return values.map((item) => {
      return (<Checkbox
        key={`checkboxKey${item.value}`}
        checked={this.state.currentValue >= item.value}
        style={{
          display: 'flex',
          width: '25px',
          height: '43px',
          flexDirection: 'row',
        }}
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
        classes={[css.checkbox]}
        onCheck={(value) => this.handleOnChange(value, item.value)}
      />)
    })
  }

  render () {
    const { material } = this.props

    return material ? (
      <MuiThemeProvider>
        <div className={[css.buttonContainer]}>
          {this.renderButtons()}
        </div>
      </MuiThemeProvider>
    ) : null
  }
}
