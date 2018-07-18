import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { ProfileModel } from 'src/models'
import ProfileWorkerSocialModel from '../../../../api/backend/model/ProfileWorkerSocialModel'
import css from './GeneralTab.scss'

export default class GeneralTab extends React.Component {
  static propTypes = {
    generalProfile: PropTypes.instanceOf(ProfileModel),
    avatarUrl: PropTypes.string,
    socials: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerSocialModel)),
  }

  renderSocials = (socials) => {
    return (
      socials && socials.map((item, index) => (
        <Field
          key={item.name}
          fullWidth
          component={TextField}
          name={`socials[${index}].url`}
          floatingLabelText={item.name}
        />
      ))
    )
  }

  render () {
    const { avatarUrl, socials } = this.props
    return (
      <div className={css.content}>
        <div className={css.logoContainer} onClick={this.handleClickLogo}>
          <div className={css.logo}>
            <img src={avatarUrl} alt='Logo' />
            <div className={css.overlay}>
              {/* <Icon
                icon={Icon.ICONS.UPLOAD}
                color={Icon.COLORS.WHITE}
                size={24}
              />
              <p>UPLOAD PHOTO</p> */}
            </div>
          </div>
        </div>
        <div className={css.block}>
          <h3>Intro</h3>
          <Field
            fullWidth
            component={TextField}
            name='verifiable.intro'
            floatingLabelText='Intro'
          />
        </div>
        <div className={css.block}>
          <h3>Social Networks Profiles</h3>
          {this.renderSocials(socials)}
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
