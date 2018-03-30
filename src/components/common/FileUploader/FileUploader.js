import React from 'react'
import css from './FileUploader.scss'
import PropTypes from 'prop-types'

export default class FileUploader extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
  }

  static defaultProps = {
    input: {
      name: 'fileUploader',
      value: '',
    },
  }

  constructor () {
    super(...arguments)
    this.state = {
      isUploading: false,
      isUploaded: false,
    }
  }

  render () {
    const classNames = [ css.root ]
    this.props.className && classNames.push(this.props.className)
    return (
      <div className={classNames.join(' ')}>
        <div className={css.label}>{this.props.label}</div>
        <input
          className={css.input}
          type='file'
          name={this.props.input.name}
        />
      </div>
    )
  }
}
