import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import ListOrientadores from './components/orientadores/List';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Route path="/orientador"       exact={true} component={ListOrientadores} />
        </div>
      </Router>
    );
  }
}

export default App;
