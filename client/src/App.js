

import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Index from './components/index';
import Game from './components/game';

export default function App(){
  return(
    <div className="App">
    <Router>
    <div>
      <h2>TypeTimer</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">homes</Link>
          </li>
          <li>
            <Link to="/game">game</Link>
          </li>
        </ul>
      </nav>
    </div>
    <Switch>
      <Route path = "/" exact component = {Index}/>
      <Route path = "/game" component = {Game}/>
    </Switch>
  </Router>
  </div>
  );
};
  

