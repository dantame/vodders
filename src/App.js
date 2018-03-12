import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from './logo.svg'
import './App.css'
import { test } from './actions'

class App extends Component {
  componentDidMount() {
    this.props.test()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {this.props.someState}
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  test: () => dispatch(test()),
})

const mapStateToProps = (state, _ownProps) => ({
  someState: state.defaultReducer === {} ? 'empty' : 'not empty',
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
