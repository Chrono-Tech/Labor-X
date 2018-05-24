import React from 'react'
import { connect } from 'react-redux'

import {
  TagCategoryModel,
  JobBoardFormModel,
  BoardPostFeeModel,
  BoardRequirementModel,
} from 'src/models/index'
import { boardCreate } from 'src/store'
import { Router } from 'src/routes'
import CreateJobBoard from './CreateJobBoardForm'


class CreateJobBoardContent extends React.Component {
  
  constructor(){
    super()
    
    this.state = {
      isLoading: false
    }
  }
  
  handleSubmit = async (values) => {
    this.setState({
      isLoading: true,
    })
    
    console.log('handle', values)
    try {
      await this.props.handleSubmit(values)
      // Router.pushRoute('/job-boards')
    } finally {
      this.setState({
        // isLoading: false,
      })
    }
  }
  
  render(){
    return (
      <CreateJobBoard onSubmit={this.handleSubmit.bind(this)} isLoading={this.state.isLoading}/>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    async handleSubmit (values) {
      // eslint-disable-next-line no-console
      console.log('--CreateJobForm#onSubmit', values, this)
      await dispatch(boardCreate(
        new JobBoardFormModel({
          name: values.name,
          logo: '',
          background: '',
          description: '',
          tagCategories: values.tagCategories.split(',').map(item => TagCategoryModel.valueOf(item)),
          joinRequirement: BoardRequirementModel.valueOf(values.joinRequirement),
          fee: BoardPostFeeModel.valueOf(values.fee),
          lhus: values.lhus,
        })
      ))
    },
  }
}

export default connect(null, mapDispatchToProps)(CreateJobBoardContent)
