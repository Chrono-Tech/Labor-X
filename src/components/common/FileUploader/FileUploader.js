import { Image, Translate } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import FileModel from '../../../models/FileModel'
import css from './FileUploader.scss'

let uploadersCounter = 0

function counter () {
  return ++uploadersCounter
}

export default class FileUploader extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    input: PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      name: PropTypes.string,
    }),
    invert: PropTypes.bool,
  }

  static defaultProps = {
    input: {
      name: `fileUploader-${counter()}`,
      value: '',
    },
  }

  constructor () {
    super(...arguments)
    this.state = {
      isUploading: false,
      isUploaded: false,
      error: null,
    }
  }

  handleUpload = () => {
    if (this.state.isUploading || this.state.isUploaded || !!this.state.error) {
      return
    }
    this.input.click()
  }

  handleFileUploaded = (file) => (e) => {
    this.setState({
      isUploading: false,
      isUploaded: true,
    })

    if (this.props.input) {
      this.props.input.onChange(new FileModel({
        name: file.name,
        type: file.type,
        size: file.size,
        content: e.target.result,
      }))
    }
  }

  handleFileError = () => {
    this.setState({
      isUploading: false,
      isUploaded: false,
      error: `${this.constructor.name}.uploadError`,
    })
  }

  handleInputChange = (e) => {
    const file = e.target.files[ 0 ]
    if (!file) {
      return
    }

    this.setState({
      isUploading: true,
      isUploaded: false,
      error: null,
    })

    const reader = new FileReader()
    reader.onload = this.handleFileUploaded(file)
    reader.onerror = this.handleFileError
    file.type === FileModel.TYPES.JSON
      ? reader.readAsText(file)
      : reader.readAsDataURL(file)
  }

  handleRemoveFile = () => {
    this.setState({
      isUploaded: false,
      isUploading: false,
      error: null,
    })
    this.input.value = ''
    this.props.input.onChange(null)
  }

  renderIcon () {
    let icon = Image.ICONS.UPLOAD_FILE_SELECT
    let color = Image.COLORS.WHITE

    if (this.state.isUploading) {
      icon = Image.ICONS.UPLOAD_FILE_UPLOADING
    }

    if (this.state.isUploaded) {
      icon = Image.ICONS.UPLOAD_FILE_SUCCESS
    }

    if (this.state.error) {
      icon = Image.ICONS.UPLOAD_FILE_ERROR
      color = Image.COLORS.ERROR
    }

    return (
      <Image
        icon={icon}
        color={color}
        clickable={false}
      />
    )
  }

  render () {
    const prefix = this.constructor.name
    const { isUploading, isUploaded, error } = this.state

    const rootClassName = this.props.invert ? css.invert : css.root
    const classNames = [ css.content ]
    this.props.className && classNames.push(this.props.className)

    let label = this.props.label

    if (isUploading) {
      classNames.push(css.uploading)
      label = `${prefix}.uploading`
    }

    if (isUploaded) {
      classNames.push(css.uploaded)
      label = `${prefix}.uploaded`
    }

    if (error) {
      label = `${prefix}.failed`
    }

    return (
      <div className={rootClassName}>
        <div
          className={classNames.join(' ')}
          onClick={this.handleUpload}
        >
          {this.renderIcon()}
          <div className={css.label}><Translate value={label} /></div>
          {(isUploaded || !!error) && (
            <Image
              icon={Image.ICONS.UPLOAD_FILE_REMOVE}
              color={Image.COLORS.WHITE}
              onClick={this.handleRemoveFile}
            />
          )}
        </div>

        {error && (
          <div className={css.error}><Translate value={error} /></div>
        )}

        <input
          className={css.input}
          // eslint-disable-next-line
          ref={(input) => this.input = input}
          onChange={this.handleInputChange}
          type='file'
          name={this.props.input.name}
        />
      </div>
    )
  }
}
