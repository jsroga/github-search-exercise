import './index.less'
import React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { history } from './store'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { GithubSearch } from './routes/GithubSearch/GithubSearch'
import { ROUTES } from './constants/routes'
import BEMhelper from 'react-bem-helper'
import {store} from './store'

const cn = new BEMhelper({
  name: 'app',
  prefix: 'pw-',
})

function App() {
  return (
    <div {...cn()}>
      <Switch>
        <Route exact={true} path={ROUTES.ROOT}>
          <GithubSearch />
        </Route>
        <Route render={() => <div>Miss</div>} />
      </Switch>
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
