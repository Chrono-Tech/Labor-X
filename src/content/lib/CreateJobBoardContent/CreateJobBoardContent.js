import React from 'react'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formValueSelector, getFormSyncErrors } from 'redux-form'

import {
  JobBoardFormModel,
  BoardRequirementModel,
  TagAreaModel,
  TagCategoryModel,
  BoardPostFeeModel,
} from 'src/models'
import { boardCreate } from 'src/store'
import CreateJobBoard from './CreateJobBoardForm'

const FORM_CREATE_JOB_BOARD = 'form/createJobBoard'

class CreateJobBoardContent extends React.Component {
  static propTypes = {
    joinRequirement: PropTypes.number,
    formErrors: PropTypes.shape({
      searchTagsError: PropTypes.string,
    }),
    canJoinAmount: PropTypes.shape({
      clients: PropTypes.number,
      workers: PropTypes.number,
    }),
    handleSubmit: PropTypes.func,
    logo: PropTypes.string,
    background: PropTypes.string,
    push: PropTypes.func,
  }

  constructor (){
    super()

    this.state = {
      isLoading: false,
    }
  }

  handleSubmit = async (values) => {
    this.setState({
      isLoading: true,
    })

    try {
      await this.props.handleSubmit(values)
      this.props.push('/my-jobs-boards')
    } finally {
      this.setState({
        isLoading: false,
      })
    }
  }

  render (){
    const { joinRequirement, formErrors, canJoinAmount, logo, background } = this.props
    return (
      <CreateJobBoard
        formErrors={formErrors}
        onSubmit={this.handleSubmit}
        isLoading={this.state.isLoading}
        joinRequirement={joinRequirement}
        canJoinAmount={canJoinAmount}
        logo={logo}
        background={background}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const formSelector = formValueSelector(FORM_CREATE_JOB_BOARD)
  // TODO @aevalyakin compute actual data
  const canJoinAmount = {
    clients: 100,
    workers: 200,
  }

  return {
    formErrors: getFormSyncErrors(FORM_CREATE_JOB_BOARD)(state),
    joinRequirement: Number(formSelector(state, 'joinRequirement')),
    logo: formSelector(state, 'logo'),
    background: formSelector(state, 'background'),
    canJoinAmount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (url) => dispatch(push(url)),
    async handleSubmit (values) {
      await dispatch(boardCreate(
        new JobBoardFormModel({
          name: values.name,
          description: '',
          endorsingSkills: values.endorsingSkills,
          tagsCategory: [TagCategoryModel.valueOf(values.tagsCategory)],
          tagsArea: [TagAreaModel.valueOf(values.tagsArea)],
          tags: values.tags,
          joinRequirement: BoardRequirementModel.valueOf(values.joinRequirement),
          fee: values.fee,
          lht: +values.lht,
          ratingRequirements: values.ratingRequirements,
          verificationRequirements: values.verificationRequirements,
          agreement: values.agreement,
          logo: values.logo,
          background: values.background,
        })
      ))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobBoardContent)
