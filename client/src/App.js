import React from "react";

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
import Homepage from "./pages/Homepage";
import duoFinder from "./pages/DuoFinder";
import AboutChampion from "./pages/AboutChampion";
import Login from "./pages/Login";
import BuildABuild from "./pages/BuildABuild";

// Components
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

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

	return (
		<ApolloProvider client={client}>
			<Router>
				<Container maxWidth="xl" disableGutters={true}>
					<Navbar />
					<Switch>
						<Route exact path="/homepage" component={Homepage} />
						<Route exact path="/" component={Login} />
						<Route exact path="/duoFinder" component={duoFinder} />
						<Route exact path="/AboutChampion" component={AboutChampion} />
						<Route exact path="/BuildABuild" component={BuildABuild} />
						<Route component={Homepage} />
					</Switch>
				</Container>
			</Router>

			{/* <Footer /> */}
		</ApolloProvider>
	);
}

// Export APP
export default App;
