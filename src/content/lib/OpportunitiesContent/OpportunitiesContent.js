import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SignerModel, JOB_STATE_CREATED } from 'src/models'
import { signerSelector, jobsListSelector, boardByIdSelector } from 'src/store'
import { Translate, OpportunityCard, Input, Image } from 'src/components/common'
import css from './OpportunitiesContent.scss'

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
            <Input
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
  const jobs = jobsListSelector()(state)

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

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesContent)

// [
//  {
//    icon: '/static/temp/get-started.png',
//    jobName: 'Install 10 Gas Ovens',
//    title: 'Get Started at Become Involved',
//    payTotal: 80,
//    payHour: 2,
//  },
// ]
