import React from 'react'
import Link from 'react-router-dom/Link'

export default () => (
    <div>
        <h1>Your Account</h1>
        <Link to='/crypto-currencies'>NEXT: Crypto-currencies</Link>
        <Link to='/account-password'>Create an Account</Link>
    </div>
)
