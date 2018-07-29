import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Widget, Image } from 'src/components/common'
import { UserAccountTypesModel } from 'src/models'

export default class CompleteProfileWidget extends React.Component {
  static propTypes = {
    accountTypes: PropTypes.instanceOf(UserAccountTypesModel),
    className: PropTypes.string,
  }

  render () {
    const { accountTypes, className } = this.props
    return (
      <Widget
        className={cn(className)}
        href='/my-profile'
        title='ui.dashboard.general.completeYourProfile'
        subtitle='ui.dashboard.general.general'
        actions={[
          {
            href: '/general-profile',
            label: 'nav.generalProfile',
            isLink: true,
            secondIcon: Image.SETS.MESSAGE_ERROR,
          },

          ...(accountTypes.client ? [ { href: '/client-profile', label: 'nav.clientProfile', isLink: true } ] : []),
          ...(accountTypes.worker  ? [ { href: '/worker-profile', label: 'nav.workerProfile', isLink: true } ] : []),
          ...(accountTypes.recruiter ? [ { href: '/recruiter-profile', label: 'nav.recruiterProfile', isLink: true } ] : []),
        ]}
      >
              If you&apos;d like you may continue to use LaborX network anonymous.
              We care about our network integrity and asks our members to pass validation
              process done by our team to ensure every profile does meet our quality data
              standards. Verification will give you an access to Job Boards with higher
              skilled and trustworthy workers and clients. Complete the following tasks
              to gain higher validation level.
      </Widget>
    )
  }
}
