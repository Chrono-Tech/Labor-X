import React from 'react'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { SignerModel, BoardModel, JobFormModel, JobIPFSModel,
  JobAddressModel, JobBudgetModel, JobPeriodModel,
  SkillModel }
  from 'src/models'
import { signerSelector, boardsListSelector, createJob, boardByIdSelector } from 'src/store'
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
    hasSkills: PropTypes.bool,
    allowCustomOffers: PropTypes.bool,
    startWorkAllowance: PropTypes.bool,
    flowType: PropTypes.number,
    selectedBoard: PropTypes.instanceOf(BoardModel),
    push: PropTypes.func,
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
      this.props.push('/posted-jobs')
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
      hasSkills,
      allowCustomOffers,
      startWorkAllowance,
      flowType,
      selectedBoard,
    } = this.props
    const { isLoading } = this.state
    return signer == null ? null : (
      <CreateJobForm
        signer={signer}
        hasBudget={hasBudget}
        hasPeriod={hasPeriod}
        hasAddress={hasAddress}
        hasSkills={hasSkills}
        selectedBoard={selectedBoard}
        allowCustomOffers={allowCustomOffers}
        startWorkAllowance={startWorkAllowance}
        flowType={flowType}
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
  const selectedBoard = boardByIdSelector(formSelector(state, 'board'))(state)

  return {
    signer,
    boards,
    selectedBoard,
    hasBudget: formSelector(state, 'hasBudget'),
    hasPeriod: formSelector(state, 'hasPeriod'),
    hasAddress: formSelector(state, 'hasAddress'),
    allowCustomOffers: formSelector(state, 'allowCustomOffers'),
    startWorkAllowance: formSelector(state, 'startWorkAllowance'),
    flowType: formSelector(state, 'flowType'),
    hourlyRating: formSelector(state, 'hourlyRating'),
    initialValues: {
      board: null,
      flowType: 2,
      tags: [],
      hasBudget: false,
      hasPeriod: false,
      hasAddress: false,
      allowCustomOffers: false,
      startWorkAllowance: false,
    },
  }
}

function mapDispatchToProps (dispatch) {
  return {
    push: (url) => dispatch(push(url)),
    async handleSubmit (values) {
      // eslint-disable-next-line no-console
      const skills = SkillModel.arrayValueOfMask(values.selectedSkills.map(x => x.index).reduce((mask, index) => (mask | Math.pow(2, index)), 0))
      const data = new JobFormModel({
        boardId: values.board,
        flowType: values.flowType,
        category: values.categories[0],
        area: values.areas[0],
        skills,
        ipfs: new JobIPFSModel({
          boardId: values.board,
          name: values.name,
          intro: values.intro,
          responsibilities: [values.responsibilities],
          minimumRequirements: [values.requirements],
          conclusion: [values.conclusion],
          hourlyRating: [values.hourlyRating],
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
                fixedPrice: values.fixedPrice,
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
