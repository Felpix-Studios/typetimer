import React, { useEffect,useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {
  ChakraProvider,
  ColorModeProvider,
  Text,
  Header,
  Flex, 
} from '@chakra-ui/react';
import socket from './socketConfig';
import theme from './theme';
import history from './components/History';
import {Container} from './components/Container';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { CreateGame } from './components/CreateGame';
import { Game } from './components/Game';

function refreshPage(){ 
    window.location.reload(); 
}

export default function App(){
  const [gameState,setGameState] = useState({_id:"",isOpen:false,players:[],words:[]});

  useEffect(()=>{
    socket.on('updateGame',(game)=>{
      console.log(game);
      setGameState(game);
    });
    return ()=>{
      socket.removeAllListeners();
    }
  },[]);

  useEffect(()=>{
    if(gameState._id!==""){
      history.push(`/game/${gameState._id}`);
      
    }
  },[gameState._id]);

  return(
    <Router history = {history}>
    <ChakraProvider resetCSS theme = {theme}>
      <ColorModeProvider options={{useSystemColorMode:true}}>
        
        <Container height="100vh">
          <Navbar/>
          
            <Switch>
              <Route exact path="/" component={Home}/>
              

              <Route  path="/game/create" component = {CreateGame}/>
              

              <Route path="/game" component = {Game}/>
              

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