import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { SignerModel, BoardModel } from 'src/models'
import { signerSelector, boardsListSelector } from 'src/store'
import { Input } from 'src/components/common'
import JobBoardItem from './JobBoardItem/JobBoardItem'
import css from './JobBoards.scss'
import inputStyles from './JobBoards.styles'

const FORM_JOB_BOARDS = 'form/jobBoards'

class JobBoards extends React.Component {

  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel),
    boards: PropTypes.arrayOf(
      PropTypes.instanceOf(BoardModel)
    ),
  }

  render () {
    const { boards } = this.props
    return (
      <div className={css.main}>
        <div className={css.contentWrapper}>
          <h2>Job Boards</h2>

          <form name={FORM_JOB_BOARDS}>
            <div className={css.actionsBlock}>
              <div className={css.search}>
                <Field
                  component={Input}
                  className={css.searchField}
                  input={inputStyles}
                  inputWrapperMods={css.searchFieldWrapper}
                  name='search'
                  type='password'
                  placeholder='Search by keyword'
                  label='Search by keyword'
                  materialInput
                />
              </div>
              <div className={css.filter}>
                <button className={css.filterButton}>
                  Sydney, Building, Industrial
                  <img src='/static/images/svg/filter.svg' alt='' width='24' height='24' />
                </button>
              </div>
            </div>

            <div className={css.jobBoardsList}>
              {boards.map(board => (
                <JobBoardItem key={board.key} status={JobBoardItem.STATUS.DEFAULT} />
              ))}
              {/*
              <JobBoardItem status={JobBoardItem.STATUS.NEED_VERIFY} />
              <JobBoardItem status={JobBoardItem.STATUS.JOINED} />
              <JobBoardItem status={JobBoardItem.STATUS.APPROVAL} />
              */}
            </div>

          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  const boards = boardsListSelector()(state)
  return {
    signer,
    boards,
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: FORM_JOB_BOARDS })(JobBoards)
)
