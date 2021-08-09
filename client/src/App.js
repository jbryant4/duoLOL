import "./App.css";
import { Route, Switch } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import DualFinder from "./pages/DualFinder";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// Components
import Navbar from "./components/layout/Navbar.js";
import {Container} from '@material-ui/core';

// Routes
function App() {
	return (
		<div>
			<Container maxWidth="xl" disableGutters={true}>
				<div>
					<Navbar />
					<Switch>
						<Route path="/">
							<Homepage />
						</Route>
						<Route path="" exact>
							<Homepage />
						</Route>
						<Route path="/DualFinder" exact>
							<DualFinder />
						</Route>
						<Route path="/Dashboard" exact>
							<Dashboard />
						</Route>
						<Route path="/Login" exact>
							<Login />
						</Route>
						<Route path="/SignUp" exact>
							<SignUp />
						</Route>
					</Switch>
				</div>
			</Container>
		</div>
	);
}

// Export APP
export default App;
