import { Image, Chip, Input } from 'components/common'
import React from 'react'
import css from './CreateJobBoard.scss'

export default class CreateJobBoard extends React.Component {
  render () {
    return (
      <div className={css.content}>
        <div className={css.headline}>
          <div className={css.actions}>
            <div>CANCEL</div>
            <div className={css.flexRow}>
              <Image className={css.actionIcon} {...Image.SETS.HELP_INVERT} />
              <div>DONE</div>
            </div>
          </div>
          <h1 className={css.boardHeadline}>Enter Job Board Headline</h1>
        </div>

        <div className={css.card}>
          <div className={css.cardDesc}>
            <div className={css.title}>Categories</div>
          </div>
          <div className={css.flexRow}>
            <Input
              className={css.find}
              type={Input.TYPES.TEXT}
              placeholder='terms.find'
            />
            <Chip value='Inventory' />
            <Chip value='Monetary Exchange' />
            <Chip value='Ordering Supplies' />
          </div>
        </div>

        <div className={[css.card, css.noMarginBottom].join(' ')}>
          <div className={css.cardDesc}>
            <div className={css.title}>Join requirements</div>
            <div className={css.subtitle}>Specify which requirements should be met in order to join the board.</div>
          </div>
          <div>
            <Input
              className={css.match}
              type={Input.TYPES.TEXT}
              placeholder='ui.createJobBoard.matchJobBoardCategories'
            />
          </div>
        </div>

        <div className={css.chartContainer}>
          <h4>How much people can join?</h4>
          <p>Check our estimates for worker and clients based on your parameters</p>
          <div className={css.chart} />
        </div>

        <div className={css.card}>
          <div className={css.cardDesc}>
            <div className={css.title}>Job Post Fee</div>
            <div className={css.subtitle}>Specify fee amount for posting job on the Job Board</div>
          </div>
          <div className={css.cardContent}>
            <div className={css.feeInputs}>
              <Input
                className={css.match}
                type={Input.TYPES.TEXT}
                placeholder='ui.createJobBoard.fixedFee'
              />
              <Input
                className={css.match}
                type={Input.TYPES.TEXT}
                placeholder='ui.createJobBoard.value'
              />
            </div>
            <div className={css.feeActions}>
              <div className={css.feeActionsIcon}>
                <Image
                  icon='file_upload'
                  color={Image.COLORS.BLUE}
                />
              </div>
              <div>
                <a href='/'>Upload Job Post Service Agreement</a>
                <div><span>By default Clients will be provided with our </span><a href='/'>Standard Agreement.</a></div>
              </div>
            </div>
          </div>
        </div>

        <div className={css.card}>
          <div className={css.cardDesc}>
            <div className={css.title}>Visuals</div>
          </div>
          <div className={css.visuals}>
            <div className={css.visualsContainer}>
              <img src='/static/temp/become.png' alt='Logo' />
              <a href='/'>UPLOAD LOGO</a>
            </div>
            <div className={css.visualsContainer}>
              <img src='/static/temp/example_bg.jpg' alt='Background' />
              <a href='/'>UPLOAD BACKGROUND</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
