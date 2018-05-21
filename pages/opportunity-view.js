import OpportunityViewContent from 'components/OpportunityView/OpportunityView'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

const OPPORTUNITY = {
  title: 'Install 10 Gas Ovens',
  refString: 'Ref # J-AA-0001',
  description: {
    responsibilities: [
      'Maintain appearance and conditions of lawn, plants, shrubs, trees and irrigation systems.',
      'Ability to perform duties and use equipment for snow removal.',
      'Ability to follow and complete work orders and preventative maintenance duties and provide   updates on the work order status.',
      'Ability to work efficiently, productively, and with minimal supervision.',
      'Follow safety precautions with appropriate PPE; providing an environment for personal and public safety.',
      'Follow department policies.',
      'Maintain a clean work site and area that minimally interferes with University operations.',
      'Perform all other duties as assigned.',
    ],
    minimumRequirements: [
      '3 years of professional/commercial landscape construction experience.',
      '3 years of experience of professional/commercial lawn maintenance experience.',
      '3 years of professional/commercial irrigation experience, installing and troubleshooting.',
      '3 years of professional/commercial snow removal experience including snow removal  equipment, i.e. plows, snow blowers, etc.',
      'Must have and maintain a valid Massachusetts driver’s license.',
      'Must have and maintain a Mass Hoisting License, minimum 2B.',
      'Knowledge of planting, trimming and pruning using hand or power equipment.',
      'Operate heavy equipment and maintenance equipment, i.e. mowers, chainsaws, etc.',
      'Ability to lift heavy items up to 50 lbs.',
      'Ability to work outdoors continuously.',
      'Ability to speak, read, understand and write fluently in the English language.',
      'Required to drive throughout the university to work areas by use of  University vehicles.',
      'Knowledge of basic safety procedures.',
    ],
    preferredRequirements: [
      '2 years of experience performing commercial and/or residential fertilizing and spraying',
      'Knowledge of perennials.',
      'Massachusetts pesticide/herbicide application license.',
    ],
    profileRequirements: [
      '20 Reviews',
      'Rating 4+',
      'Account Validation Level 4',
    ],
    category: 'Warehousing',
    starts: new Date('2017-12-20'),
    deadline: new Date('2017-12-23'),
    location: '3207, Saint Kilda, Melbourne, AU',
    payHour: 2,
    totalHours: 40,
  },
  company: {
    description: 'Created in 1900, we are so good company with so good services and willing to pay well for experienced workers.',
    status: 'Company',
    location: 'Melbourne, Australia',
    totalSpent: '50K+',
    totalHires: 120,
    client: {
      name: 'Get Started',
      icon: '/static/temp/get-started.png',
    },
    board: {
      name: 'Become Involved',
      icon: '/static/temp/become.png',
    },
    categories: [
      'Warehousing',
      'Industrial Cleaning',
      'Industrial Machinery',
      'Interior Aircraft Assembly',
      'Machinery Maintenance',
    ],
  },
}

class OpportunityViewPage extends React.Component {
  render () {
    return (
      <MainLayout title={OPPORTUNITY.title}>
        <OpportunityViewContent {...OPPORTUNITY} />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(OpportunityViewPage)
