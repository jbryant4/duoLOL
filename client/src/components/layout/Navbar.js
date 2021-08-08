import React from "react";
import { Link } from "react-router-dom";

// Navbar Component
function Navbar() {
	return (
		<header>
			<div> LOL </div>
			<nav>
				<ul>
					<li>
						{/* Link internally adds an onclick internally and will update the URL and load appropriate components */}
						<Link to="/">Homepage</Link>
					</li>
					<li>
						<Link to="/Dashboard">Dashboard</Link>
					</li>
					<li>
						<Link to="/DualFinder">Dual Finder</Link>
					</li>
					<li>
						<Link to="/Login">Login</Link>
					</li>
					<li>
						<Link to="/SignUp">Sign Up</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

// export Navbar
export default Navbar;
