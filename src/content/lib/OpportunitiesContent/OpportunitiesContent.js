import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { SignerModel, JOB_STATE_CREATED } from 'src/models'
import { signerSelector, jobsFilteredListSelector, boardByIdSelector, updateFilterJobs } from 'src/store'
import { Translate, OpportunityCard, Input, Image } from 'src/components/common'
import css from './OpportunitiesContent.scss'

const FORM_JOBS = 'form/jobs'

const onSubmit = (values, dispatch) => {
  dispatch(updateFilterJobs(values))
}

export class OpportunitiesContent extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel),
    cards: PropTypes.arrayOf(PropTypes.shape(OpportunityCard.propTypes)),
  }

  render () {
    const { cards } = this.props
    return !cards ? null : (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.opportunities' /></div>
        </div>
        <div className={css.content}>
          <div className={css.searchRow}>
            <Image
              icon={Image.ICONS.SEARCH}
              color={Image.COLORS.BLACK}
            />
            <Field
              component={Input}
              name='searchText'
              className={css.search}
              lineEnabled
              type={Input.TYPES.TEXT}
              mods={css.alignLeft}
              placeholder='Search by keyword'
            />
            <div className={css.filterRow}>
              <p>Sydney, Building, Industrial</p>
              <Image
                icon={Image.ICONS.FILTER}
                color={Image.COLORS.BLACK}
              />
            </div>
          </div>
          <div className={css.opportunities}>
            {cards.map((card) => (<OpportunityCard {...card} key={card.job.key} />))}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  const jobs = jobsFilteredListSelector()(state)

  const allowedStates = [ JOB_STATE_CREATED ]
  const cards = jobs
    .filter(job => !!allowedStates.find(state => job.state === state)) // TODO @ipavlenko: Just CREATED jobs
    .map(job => ({
      job,
      board: boardByIdSelector(job.boardId)(state),
    }))

  return {
    signer,
    cards,
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

const form = reduxForm({
  form: FORM_JOBS,
  fields: ['searchText'],
  onChange: (values, dispatch) => {
    dispatch(updateFilterJobs(values))
  },
  onSubmit,
})(OpportunitiesContent)

export default connect(mapStateToProps, mapDispatchToProps)(form)
