import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { TextField, SelectField } from 'redux-form-material-ui'
import { MenuItem } from 'material-ui'
import { Icon } from 'src/components/common'
import { ProfileModel } from 'src/models'
import css from './GeneralTab.scss'

export default class GeneralTab extends React.Component {
  static propTypes = {
    generalProfile: PropTypes.instanceOf(ProfileModel),
  }

  handleClickLogo = () => {
    // eslint-disable-next-line no-console
    console.log('---WorkerProfileContent-GeneralTab handleClickLogo')
  }

  render () {
    const { generalProfile } = this.props
    return (
      <div className={css.content}>
        <div className={css.logoContainer} onClick={this.handleClickLogo}>
          <div className={css.logo}>
            <img src={generalProfile.ipfs.logo} alt='Logo' />
            <div className={css.overlay}>
              <Icon
                icon={Icon.ICONS.UPLOAD}
                color={Icon.COLORS.WHITE}
                size={24}
              />
              <p>UPLOAD PHOTO</p>
            </div>
          </div>
        </div>
        <div className={css.block}>
          <h3>Intro</h3>
          <Field
            fullWidth
            component={TextField}
            name='intro'
            floatingLabelText='Intro'
          />
        </div>
        <div className={css.block}>
          <h3>Social Networks Profiles</h3>
          <div className={css.twoColumn}>
            <Field
              fullWidth
              component={TextField}
              name='linkedin'
              floatingLabelText='LinkedIn'
            />
            <Field
              fullWidth
              component={TextField}
              name='facebook'
              floatingLabelText='Facebook'
            />
          </div>
          <div className={css.twoColumn}>
            <Field
              fullWidth
              component={TextField}
              name='twitter'
              floatingLabelText='Twitter'
            />
            <Field
              fullWidth
              component={SelectField}
              name='social'
              floatingLabelText='Other'
            >
              <MenuItem value={0} primaryText='Social 1' />
              <MenuItem value={1} primaryText='Social 2' />
              <MenuItem value={2} primaryText='Social 3' />
            </Field>
          </div>
        </div>
        <div className={css.block}>
          <h3>Page Background</h3>
          <div className={css.backgrounds}>
            <img src='/static/temp/example_bg.jpg' alt='bg' />
            <img src='/static/temp/example_bg.jpg' alt='bg' />
            <img src='/static/temp/example_bg.jpg' alt='bg' />
          </div>
        </div>
      </div>
    )
  }
}
