import React from 'react';
//import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  ChakraProvider,
  ColorModeProvider,
  Text,
  Header,
  Flex, 
} from '@chakra-ui/react';
import theme from './theme';
import History from './components/History';
import {Container} from './components/Container';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home'
import { Game } from './components/Game'

export default function App(){
  return(
    <Router history = {History}>
    <ChakraProvider resetCSS theme = {theme}>
      <ColorModeProvider options={{useSystemColorMode:true}}>
        
        <Container height="100vh">
          <Navbar/>
          
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/game">
                <Game />
              </Route>
            </Switch>
          
        </Container>
        
      </ColorModeProvider>
  </ChakraProvider>
  </Router>
  );
};
  

/*<Router>
            <div>
              <Navbar></Navbar>
            </div>
            <Switch>
              <Route path = "/" exact component = {Home}/>
              <Route path = "/game" component = {Game}/>
            </Switch>
          </Router>*/