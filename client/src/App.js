import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Pages
import Homepage from "./pages/Homepage";
import DualFinder from "./pages/DualFinder";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// Components
import Navbar from "./components/layout/Navbar.js";
import {Container} from '@material-ui/core';


const httpLink = createHttpLink({
	uri: "/graphql",
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
	return (
		<ApolloProvider client={client}>
			<Router>
				<div>
					<Navbar />
					<div>
						<Container maxWidth="xl" disableGutters={true}>
							<div>
								<Switch>
									<Route exact path="/" component={Homepage} />
									<Route exact path="/login" component={Login} />
									<Route exact path="/signup" component={SignUp} />
									<Route exact path="/dualFinder" component={DualFinder} />
									<Route exact path="/dashboard" component={Dashboard} />

									<Route component={Homepage} />
								</Switch>
							</div>
						</Container>
					</div>
				</div>
			</Router>
		</ApolloProvider>
	);
}

// Export APP
export default App;
