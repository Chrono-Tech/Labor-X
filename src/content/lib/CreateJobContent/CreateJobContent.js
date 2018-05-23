import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SignerModel, BoardModel, JobPostFormModel } from 'src/models'
import { Router } from 'src/routes'
import { signerSelector, boardsListSelector, createJob } from 'src/store'
import CreateJobForm from './CreateJobForm'

export class CreateJobContent extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    signer: PropTypes.instanceOf(SignerModel),
    boards: PropTypes.arrayOf(
      PropTypes.instanceOf(BoardModel),
    ),
  }

  state = {
    isLoading: false,
  }

  handleSubmit = async (values) => {
    this.setState({
      isLoading: true,
    })
    try {
      await this.props.handleSubmit(values)
      Router.pushRoute('/posted-jobs')
    } finally {
      this.setState({
        isLoading: false,
      })
    }
  }

  render () {
    const { signer, boards } = this.props
    const { isLoading } = this.state
    return signer == null ? null : (
      <CreateJobForm
        signer={signer}
        boards={boards}
        isLoading={isLoading}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  const boards = boardsListSelector()(state)
  return {
    signer,
    boards,
    initialValues: {
      boardId: null,
    },
  }
}

function mapDispatchToProps (dispatch) {
  return {
    async handleSubmit (values) {
      await dispatch(createJob(new JobPostFormModel(values)))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobContent)
