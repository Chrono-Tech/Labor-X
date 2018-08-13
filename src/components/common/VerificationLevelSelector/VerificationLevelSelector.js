import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Tip, Icon } from 'src/components/common'
import Checkbox from '@material-ui/core/Checkbox'

import css from './VerificationLevelSelector.scss'

export default class VerificationLevelSelector extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    input: PropTypes.shape({
      onChange: PropTypes.func,
    }),
  }

  constructor (props) {
    super(props)

    this.state = {
      currentValue: 0,
    }
  }

  handleOnChange = (level) => {
    this.setState({
      currentValue: level,
    })
    this.props.input.onChange(level)
  }

  renderShield (level, tip) {
    return (
      <Tip
        position={Tip.POSITION.LEFT}
        tipContent={(
          <div>
            <b>Level {level}</b>
            <div className={css.popoverDescription}>
              {tip}
            </div>
          </div>
        )}
      >
        <Checkbox
          name={`verificationCb${level}`}
          classes={{ root: css.checkbox }}
          checked={this.state.currentValue >= level}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={() => this.handleOnChange(level)}
          checkedIcon={this.renderIcon(level, true)}
          icon={this.renderIcon(level, false)}

        />
      </Tip>
    )
  }

  renderIcon (level, checked) {
    return (
      <div className={css.icon}>
        <Icon faded={!checked} size={38} {...Icon.SETS.SECURITY} />
        <span>{level}</span>
      </div>
    )
  }

  render () {
    const { className } = this.props
    return (
      <div className={cn(css.shieldRow, className)}>
        { this.renderShield(1, 'Ether email or phone is validated.') }
        { this.renderShield(2, 'ID, email or phone are validated.') }
        { this.renderShield(3, 'Address, ID, email or phone are validated.') }
        { this.renderShield(4, 'Insurance, work permit, certificates, recommendations and other supportive documents, address, ID, email or phone are validated.') }
      </div>
    )
  }
}
