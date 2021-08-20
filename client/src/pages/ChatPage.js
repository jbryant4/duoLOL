// React
import { Container } from "@material-ui/core";
import React from "react";

//components
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Auth from "../utils/auth"
import { Redirect } from "react-router-dom";
//redirect
// Chat
function ChatPage() {

	if (!Auth.loggedIn()) {
		return <Redirect to='/' />
	}

	
	return (
		<div>
			<Navbar />
			<Container>
			<Header />
				<Chat />
			</Container>
		</div>
	);
}

// export Chat
export default ChatPage;
