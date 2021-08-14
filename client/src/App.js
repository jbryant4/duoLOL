import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


// Pages
import Homepage from "./pages/Homepage";
import duoFinder from "./pages/DuoFinder";
import Dashboard from "./pages/Dashboard";
import AboutChampion from "./pages/AboutChampion";
import Login from "./pages/Login";

// import Drawer from "./components/Drawer";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

//material UI
import Container from "@material-ui/core/Container";

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
	const currentPath = window.location.pathname
	return (
		<ApolloProvider client={client}>
			<Router>
				<Container maxWidth="xl" disableGutters={true}>
					{currentPath.includes('/login') ? null : <SideBar />}
					<Switch>
						<Route exact path="/login" component={Login} />
						<Redirect exact path="/" to="/login" />						
						<Route exact path="/homepage" component={Homepage} />
						<Route exact path="/duoFinder" component={duoFinder} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/AboutChampion" component={AboutChampion} />
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
