// React
import { Container } from "@material-ui/core";
import React from "react";

//components
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";

// Chat
function ChatPage() {
	return (
		<div>
			<Navbar />
			<Container>
				<Chat />
			</Container>
		</div>
	);
}

// export Chat
export default ChatPage;
