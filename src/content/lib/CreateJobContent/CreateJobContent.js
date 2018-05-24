import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { SignerModel, BoardModel, JobFormModel, JobIPFSModel, JobAddressModel, JobBudgetModel, JobPeriodModel, SkillModel, TagAreaModel, TagCategoryModel } from 'src/models'
import { Router } from 'src/routes'
import { signerSelector, boardsListSelector, createJob } from 'src/store'
import CreateJobForm, { FORM_CREATE_JOB } from './CreateJobForm'

export class CreateJobContent extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    signer: PropTypes.instanceOf(SignerModel),
    boards: PropTypes.arrayOf(
      PropTypes.instanceOf(BoardModel),
    ),
    hasBudget: PropTypes.bool,
    hasPeriod: PropTypes.bool,
    hasAddress: PropTypes.bool,
    hasRequirements: PropTypes.bool,
    hasSkills: PropTypes.bool,
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
    const {
      signer,
      boards,
      hasBudget,
      hasPeriod,
      hasAddress,
      hasRequirements,
      hasSkills,
    } = this.props
    const { isLoading } = this.state
    return signer == null ? null : (
      <CreateJobForm
        signer={signer}
        hasBudget={hasBudget}
        hasPeriod={hasPeriod}
        hasAddress={hasAddress}
        hasRequirements={hasRequirements}
        hasSkills={hasSkills}
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
  const formSelector = formValueSelector(FORM_CREATE_JOB)

  return {
    signer,
    boards,
    hasBudget: formSelector(state, 'hasBudget'),
    hasPeriod: formSelector(state, 'hasPeriod'),
    hasAddress: formSelector(state, 'hasAddress'),
    hasRequirements: formSelector(state, 'hasRequirements'),
    hasSkills: formSelector(state, 'hasSkills'),
    initialValues: {
      board: null,
      tags: [],
      hasBudget: false,
      hasPeriod: false,
      hasAddress: false,
      hasRequirements: false,
      hasSkills: false,
    },
  }
}

function mapDispatchToProps (dispatch) {
  return {
    async handleSubmit (values) {
      console.log(values.skills, values.skills.reduce((mask, index) => (mask | Math.pow(2, index)), 0))
      const data = new JobFormModel({
        boardId: values.board,
        category: TagCategoryModel.valueOf(values.category),
        area: TagAreaModel.valueOf(values.area),
        skills: SkillModel.arrayValueOfMask(values.skills.reduce((mask, index) => (mask | Math.pow(2, index)), 0)),
        ipfs: new JobIPFSModel({
          name: values.name,
          intro: values.intro,
          responsibilities: values.responsibilities,
          requirements: values.requirements,
          // logo: values.logo, // TODO @ipavlenko: Implement logo
          address: new JobAddressModel(
            !values.hasAddress
              ? { isSpecified: false }
              : {
                isSpecified: true,
                state: values.state,
                city: values.city,
                zip: values.zip,
                street: values.street,
                building: values.building,
                suit: values.suit,
              }
          ),
          budget: new JobBudgetModel(
            !values.hasBudget
              ? { isSpecified: false }
              : {
                isSpecified: true,
                hourlyRate: values.hourlyRate,
                totalHours: values.totalHours,
              }
          ),
          period: new JobPeriodModel(
            !values.hasPeriod
              ? { isSpecified: false }
              : {
                since: values.since,
                until: values.until,
              }
          ),
        }),
      })
      await dispatch(createJob(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobContent)
