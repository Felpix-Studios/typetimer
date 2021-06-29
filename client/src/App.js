

import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/navbar';
import Index from './components/index';
import Game from './components/game';

export default function App(){
  return(
    <ChakraProvider>
    <div className="App">
    <Router>
    <div>
      <h2>TypeTimer</h2>
      <Navbar></Navbar>
    </div>
    <Switch>
      <Route path = "/" exact component = {Index}/>
      <Route path = "/game" component = {Game}/>
    </Switch>
  </Router>
  </div>
  </ChakraProvider>
  );
};
  

