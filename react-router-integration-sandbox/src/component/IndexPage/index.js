import React from 'react'
import Link from 'react-router-dom/Link'

import css from './index.scss'

export default () => (
    <div>
        <h1>index view</h1>
        <Link to='/account-password'>New Account</Link>
        <Link to='/my-accounts'>Login</Link>
    </div>
)