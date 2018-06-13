import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'

import {
  TagCategoryModel,
  JobBoardFormModel,
  BoardPostFeeModel,
  BoardRequirementModel,
  BOARD_REQUIREMENTS_LIST,
} from 'src/models'
import { boardCreate } from 'src/store'
import { Router } from 'src/routes'
import CreateJobBoard, { FORM_CREATE_JOB_BOARD } from './CreateJobBoardForm'

class CreateJobBoardContent extends React.Component {
  
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
      Router.pushRoute('/job-boards')
    } finally {
      this.setState({
        isLoading: false,
      })
    }
  }
  
  render (){
    const { isSpecificRequirements } = this.props
    return (
      <CreateJobBoard
        onSubmit={this.handleSubmit}
        isLoading={this.state.isLoading}
        isSpecificRequirements={isSpecificRequirements}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const formSelector = formValueSelector(FORM_CREATE_JOB_BOARD)
  
  return {
    isSpecificRequirements: formSelector(state, 'joinRequirement') == 1,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    async handleSubmit (values) {
      
      await dispatch(boardCreate(
        new JobBoardFormModel({
          name: values.name,
          logo: '',
          background: '',
          description: '',
          endorsingSkills: values.endorsingSkills,
          tagCategories: values.tagCategories && values.tagCategories.split(',').map(item => TagCategoryModel.valueOf(item)) || [],
          joinRequirement: BoardRequirementModel.valueOf(values.joinRequirement),
          fee: BoardPostFeeModel.valueOf(values.fee),
          lhus: values.lhus,
        })
      ))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobBoardContent)
