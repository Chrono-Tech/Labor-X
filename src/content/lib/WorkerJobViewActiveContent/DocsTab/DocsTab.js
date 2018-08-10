import React from 'react'
import css from './DocsTab.scss'


export default class DocsTab extends React.Component {
  static propTypes = {
  }

  render () {
    return (
      <div className={css.rootContainer}>
        <div className={css.generalDataContainer}>
          <div className={css.dataRow}>
            <h3>Starts at:</h3>
            <span className={css.dataText}>2222</span>
          </div>
          <div className={css.dataRow}>
            <h3>Deadline:</h3>
            <span className={css.dataText}>34</span>
          </div>
          {job.ipfs.budget.isSpecified && (
            <div className={css.dataRow}>
              <h3>Hours:</h3>
              <span className={css.dataText}>54645</span>
            </div>
          )}
          {job.ipfs.budget.isSpecified && (
            <div className={css.dataRow}>
              <h3>Est. Budget:</h3>
              <span className={css.dataText}>546</span>
            </div>
          )}
        </div>
      </div>
    )
  }
}
