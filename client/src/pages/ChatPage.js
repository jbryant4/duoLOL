// React
import { Container } from "@material-ui/core";
import React from "react";

//components
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

// Chat
function ChatPage() {
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
