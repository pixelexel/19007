import React, { Component } from 'react';
import './styles/App.scss';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'

import CssBaseline from 'material-ui/CssBaseline'
import { MuiThemeProvider } from 'material-ui/styles'
import Root from './containers/Root'
import { hot } from 'react-hot-loader'
import { AppTheme } from './config'

class App extends Component {
  render() {
    return (
    <MuiThemeProvider theme={AppTheme}>
      <div className="App">
        <CssBaseline/>
        <Root/>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default hot(module)(App)
