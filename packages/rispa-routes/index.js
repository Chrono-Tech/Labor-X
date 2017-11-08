import React from 'react'
import { Switch, Route } from 'react-router-dom'

const getRoutes = context => {
  /* eslint-disable global-require */
  const modules = [
    require('chronobank-login').default,
    require('laborx-dashboard').default,
    // ~~ ADD HERE ~~ Do not remove
  ]

  const routes = modules
    .map(module => module(context))
    .filter(Boolean)

  return (
    <Switch>
      {routes.map(params => <Route key={params.path} {...params} />)}
    </Switch>
  )
}

export default getRoutes
