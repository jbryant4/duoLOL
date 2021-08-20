import React, { useState } from "react";

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";

import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

//material UI
import Container from "@material-ui/core/Container";

// Pages
import Home from "./pages/Home";
import duoFinder from "./pages/DuoFinder";
import AboutChampion from "./pages/AboutChampion";
import Login from "./pages/Login";
import BuildABuild from "./pages/BuildABuild";
import ChatPage from "./pages/ChatPage";

// Components
import Chat from "./components/Chat";

// background css
import "./App.css";

//import Auth
import Auth from "./utils/auth"

//!change back to /graphql when we go live
const httpLink = createHttpLink({
	uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

// Routes
function App() {
	const currentPath = window.location.pathname;
	const [token, setToken] = useState(false);

	return (
		<ApolloProvider client={client}>
				<Router>
					<Container className="noBg" maxWidth="xl" disableGutters={true}>
						<Switch>
							<Route exact path="/home" component={Home} />
							<Route exact path="/" component={Login} />
							<Route exact path="/duoFinder" component={duoFinder} />
							<Route exact path="/AboutChampion" component={AboutChampion} />
							<Route exact path="/BuildABuild" component={BuildABuild} />
							<Route exact path="/ChatPage" component={ChatPage} />
							<Route component={Home} />
						</Switch>
					</Container>
				</Router>
		</ApolloProvider>
	);
}

// Export APP
export default App;
