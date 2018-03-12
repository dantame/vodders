import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  Route,
  Switch,
} from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'


import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store, { history } from './store'

class Index extends React.Component {
  render() {
    const { store, history } = this.props

    return (
       <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </ConnectedRouter>
       </Provider>
    )
  }
}

ReactDOM.render(<Index store={store} history={history} />, document.getElementById('root'))

registerServiceWorker()
