import PropTypes from 'prop-types'
import React from 'react'
import css from './Chip.scss'

export default class Chip extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    index: PropTypes.number,
    onRemove: PropTypes.func,
    showRemoveButton: PropTypes.bool,
  }

  static defaultProps = {
    showRemoveButton: true,
  }

  handleRemove = () => {
    this.props.onRemove && this.props.onRemove(this.props.index)
  }

  render () {
    const { showRemoveButton } = this.props
    return (
      <div className={css.root}>
        <div className={css.value}>{this.props.value}</div>
        {
          showRemoveButton && <div className={css.remove} onClick={this.handleRemove}>x</div>
        }        
      </div>
    )
  }
}
