import PropTypes from 'prop-types'
import React from 'react'
import Checkbox from 'material-ui/Checkbox'

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

  handleOnChange = (event) => {
    this.props.input.onChange(Number(event.target.dataset.id))
  }

  renderButtons () {
    const { values, input, checkedIcon, uncheckedIcon } = this.props

    return values.map((item) => {
      return (<Checkbox
        key={`checkboxKey${item.value}`}
        checked={input.value >= item.value}
        style={{
          display: 'flex',
          width: '25px',
          height: '43px',
          flexDirection: 'row',
        }}
        input={input}
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
        classes={[css.checkbox]}
        onCheck={this.handleOnChange}
        data-id={item.value}
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
