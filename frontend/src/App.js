import React, { Component } from 'react';
import './styles/App.scss';
import CssBaseline from 'material-ui/CssBaseline';
import HomeScreenContainer from './containers/HomeScreenContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline/>
        <HomeScreenContainer/>
      </div>
    );
  }
}

export default App;
