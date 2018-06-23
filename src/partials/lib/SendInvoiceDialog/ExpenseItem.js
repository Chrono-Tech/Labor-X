import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../../../components/common"
import css from './SendInvoiceDialog.scss'

export default class ExpenseItem extends React.Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }

  handleRemove = () => {
    this.props.onClick(this.props.index)
  }

  render () {
    const { name, value } = this.props
    return (
      <div className={css.bodyRow}>
        <p>{name}</p>
        <div className={css.fieldWithIcon}>
          <p>${value.toFixed(2)}</p>
          <Icon
            className={css.icon}
            onClick={this.handleRemove}
            size={30}
            icon={Icon.ICONS.DELETE}
            color={Icon.COLORS.GREY30}
          />
        </div>
      </div>
    )
  }

}
