import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import ListOrientadores from './components/orientadores/List';
import ListAlunos from './components/alunos/List';
import FormOrientadores from './components/orientadores/Form';
import FormAlunos from './components/alunos/Form';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/aluno"            exact={true} component={ListAlunos} />
          <Route path="/aluno/novo"                    component={FormAlunos} />
          <Route path="/aluno/edit/:id"                component={FormAlunos} />

          <Route path="/orientador"       exact={true} component={ListOrientadores} />
          <Route path="/orientador/novo"               component={FormOrientadores} />
          <Route path="/orientador/edit/:id"           component={FormOrientadores} />
        </div>
      </Router>
    );
  }
}

export default App;
