import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { all } from 'redux-saga/effects'
import { githubSearchReducer } from './githubSearch/reducer'
import { githubSearchSaga } from './githubSearch/sagas'
import { GithubSearchState } from './githubSearch/types'
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from '@redux-saga/core'

export const history = createBrowserHistory()

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  )

  sagaMiddleware.run(rootSaga)

  return { store }
}

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    githubSearch: githubSearchReducer,
  })

export function* rootSaga() {
  yield all([githubSearchSaga()])
}

export const { store } = configureStore()

export interface State {
  githubSearch: GithubSearchState
  router: RouterState
}
