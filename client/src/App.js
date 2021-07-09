import React, { useEffect, useState } from "react";
import "./App.css";
import { Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
	ChakraProvider,
	ColorModeProvider,
	Text,
	Header,
	Flex,
} from "@chakra-ui/react";
import socket from "./socketConfig";
import theme from "./theme";
import { Container } from "./components/Container";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { CreateGame } from "./components/CreateGame";
import { JoinGame } from "./components/JoinGame";
import { Game } from "./components/Game";

export default function App() {
    const history = useHistory();
	const [gameState, setGameState] = useState({
		_id: "",
		isOpen: false,
		players: [],
		words: [],
	});

	useEffect(() => {
		socket.on("updateGame", (game) => {
			console.log(game);
			setGameState(game);
		});
		return () => {
			socket.removeAllListeners();
		}
	}, []);

	useEffect(() => {
		if (gameState._id !== "") {
			history.push(`/game/${gameState._id}`);
		}
	}, [gameState._id]);

	return (
		<Router history={history}>
			<ChakraProvider resetCSS theme={theme}>
				<ColorModeProvider options={{ useSystemColorMode: true }}>
					<Container height="100vh">
						<Navbar />

						<Switch class='switch'>
							<Route exact path="/" component={Home} />
							<Route
								exact
								path="/game/create"
								component={CreateGame}
							/>
							<Route
								exact
								path="/game/join"
								component={JoinGame}
							/>
							<Route
								path="/game/:gameID"
								render={(props) => (
									<Game {...props} gameState={gameState} />
								)}
							>
							</Route>
						</Switch>
					</Container>
				</ColorModeProvider>
			</ChakraProvider>
		</Router>
	);
}