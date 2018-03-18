import React, { Component } from 'react';
import './styles/App.scss';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'

import CssBaseline from 'material-ui/CssBaseline';
import Root from './containers/Root'
import { hot } from 'react-hot-loader'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline/>
        <Root/>
      </div>
    );
  }
}

export default hot(module)(App)
