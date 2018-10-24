import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectForm from './components/ProjectForm'
import Nav from './components/Nav'
import Home from './components/Home'
import Projects from './components/Projects'
import './App.css'

class App extends Component {
  render() {
    //<Route exact path="/" render={() => <Home />} />
    return (

      <div>
        <Nav />


        <Route exact path='/' component={Home} />
        <Route path="/addProject" component={ProjectForm} />
        <Route path="/projects" component={Projects} />
      </div>

    );
  }
}

export default App;
