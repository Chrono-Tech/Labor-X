import Dashboard from './containers/Dashboard'
// import reducer, { action } from './redux/reducer'
// import { match } from '@rispa/redux'

const registerReducer = () => {
  // store.injectReducer('reducerName', reducer)
}

const registerWhen = () => {
  // when(match('/'), action)
}

const registerModule = context => {
  registerReducer(context)
  registerWhen(context)

  return Dashboard
}

export default registerModule
