import React from 'react'
import { Switch, Route } from 'react-router-dom'

const getRoutes = (store, when) => {
  /* eslint-disable global-require */
  const modules = [
    // ~~ ADD HERE ~~ Do not remove
  ]

  const routes = modules
    .map(module => module(store, when))
    .filter(Boolean)

  return (
    <Switch>
      {routes.map(params => <Route key={params.path} {...params} />)}
    </Switch>
  )
}

export default getRoutes
