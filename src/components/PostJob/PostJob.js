import { Image, Input, Chip, Badge, Checkbox } from 'components/common'
import React from 'react'
import css from './PostJob.scss'

export default class PostJob extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleBar}>
            <Image
              icon='arrow_back'
              color={Image.COLORS.WHITE}
            />
            <div>
              <Image
                className={css.helpIcon}
                icon='help_outline'
                color={Image.COLORS.WHITE}
              />
              <p>DONE</p>
            </div>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.headline}>
            <h1 className={css.boardHeadline}>Enter Job Headline</h1>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}>General</h3>
            <div className={css.inputSection}>
              <p>Intro</p>
              <Input
                lineEnabled
                type={Input.TYPES.TEXT}
                placeholder='Write a few words about the position'
              />
            </div>
            <div className={css.inputSection}>
              <p>Responsibilities</p>
              <Input
                lineEnabled
                type={Input.TYPES.TEXT}
                placeholder='Which responsibilities worker will have?'
              />
            </div>
            <div className={css.inputSection}>
              <p>Worker Requirements</p>
              <Input
                lineEnabled
                type={Input.TYPES.TEXT}
                placeholder='Which requirements should be met by worker?'
              />
            </div>
            <div className={css.inputSection}>
              <p>Conclusion</p>
              <Input
                lineEnabled
                type={Input.TYPES.TEXT}
                placeholder='Write any additional job related information about the position here'
              />
            </div>
          </div>

          <div className={[css.card, css.noMarginBottom].join(' ')}>
            <h3 className={css.cardTitle}>Job Board</h3>
            <Input
              lineEnabled
              type={Input.TYPES.TEXT}
              placeholder='General'
            />
          </div>
          <div className={css.badgesContainer}>
            <h4>How much people can join?</h4>
            <p>By posting your job in the selected Job Board the following workers will be able able to apply.</p>
            <div className={css.badges}>
              <Badge
                value='1+'
                title='Rating'
              />
              <Badge
                value='Any'
                title='Validation'
              />
              <Badge
                value='Any'
                title='Endorsement'
              />
              <Badge
                value='Any'
                title='Categories'
              />
            </div>
          </div>
          <div className={css.card}>
            <Input
              lineEnabled
              type={Input.TYPES.TEXT}
              placeholder='Force Worker Rating'
            />
            <h4>Average hourly charge per rating, LHUS</h4>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}>Budget</h3>
            <div className={css.twoColumn}>
              <div>
                <p>Hourly Rate, LHUS</p>
                <Input
                  lineEnabled
                  type={Input.TYPES.TEXT}
                  placeholder='2'
                />
              </div>
              <div>
                <p>Total Hours</p>
                <Input
                  lineEnabled
                  type={Input.TYPES.TEXT}
                  placeholder='40'
                />
              </div>
            </div>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}>Deadline</h3>
            <div className={css.twoColumn}>
              <div>
                <p>Starts At</p>
                <div>
                  calendar
                </div>
              </div>
              <div>
                <p>Starts At</p>
                <div>
                  calendar
                </div>
              </div>
            </div>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}>Address</h3>
            <div className={css.flexRow}>
              <Checkbox />
              <p>Use company address</p>
            </div>
            <div className={css.twoColumn}>
              <div>
                <Input
                  lineEnabled
                  type={Input.TYPES.TEXT}
                  placeholder='State'
                />
                <Input
                  lineEnabled
                  type={Input.TYPES.TEXT}
                  placeholder='ZIP'
                />
                <Input
                  lineEnabled
                  type={Input.TYPES.TEXT}
                  placeholder='Street'
                />
              </div>
              <div>
                <Input
                  lineEnabled
                  type={Input.TYPES.TEXT}
                  placeholder='City'
                />
                <div className={css.twoColumn}>
                  <Input
                    lineEnabled
                    type={Input.TYPES.TEXT}
                    placeholder='Building #'
                  />
                  <Input
                    lineEnabled
                    type={Input.TYPES.TEXT}
                    placeholder='Suit'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}>Categories</h3>
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
          <div className={css.card}>
            <div className={css.flexRow}>
              <Checkbox />
              <p>I have read and agree with Job Board Agreement</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
