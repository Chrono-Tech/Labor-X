import PropTypes from 'prop-types'
import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

import css from './RadioIcon.scss'

export default class RadioIcon extends React.Component {
  static propTypes = {
    radioButtonClassName: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    checkedIcon: PropTypes.node,
    uncheckedIcon: PropTypes.node,
    values: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    })),
    input: PropTypes.shape({
      value: PropTypes.number,
      onChange: PropTypes.func,
    }),
    material: PropTypes.bool,
  }

  static defaultProps = {
    label: null,
    material: false,
    values: [],
  }

  constructor (props) {
    super(props)
  }

  handleOnChange = (value) => {
    this.props.input.onChange(Number(value))
  }

  renderButtons () {
    const { values, input, checkedIcon, uncheckedIcon } = this.props

    return values.map((item) => {
      return (<Checkbox
        key={`checkboxKey${item.value}`}
        checked={input.value >= item.value}
        classes={{ root: css.checkbox }}
        input={input}
        checkedIcon={checkedIcon}
        icon={uncheckedIcon}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={() => this.handleOnChange(item.value)}
      />)
    })
  }

  render () {
    const { material } = this.props

    return material ? (
      <div className={[css.buttonContainer]}>
        {this.renderButtons()}
      </div>
    ) : null
  }
}
