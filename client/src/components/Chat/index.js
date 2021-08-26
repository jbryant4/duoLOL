import React, { useEffect, useRef, useState } from "react";
import { makeStyles, Box, Container, Button } from "@material-ui/core";
import {
	subscribeToMessages,
	initiateSocketConnection,
	disconnectSocket,
	sendMessage,
	joinRoom,
	leaveRoom,
} from "./socketIo.service";

import AuthService from "../../utils/auth";

function Chat() {
	const [messages, setMessages] = useState([]);
	const inputRef = useRef("");
	const joinRef = useRef("");
	const [user, setUser] = useState([]);
	const [room, setRoom] = useState("Global Chat Room");

	const token = AuthService.getToken();

	const chatter = AuthService.getProfile().data.sumName;

	const useStyles = makeStyles({
		fontContainer: {
			fontFamily: "'STIX Two Text', serif",
		},
		contain: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			textDecoration: "none",
			color: "goldenrod",
			flexWrap: "wrap",
		},
		box: {
			color: "goldenrod",
			height: "600px",
			width: "45%",
			overflowY: "scroll",
			display: "flex",
			flexDirection: "column",
			backgroundColor: "var(--altTertiary)",
			minHeight: "100%",
			minWidth: "45%",
			borderRadius: "15px",
		},
		peopleBox: {
			margin: "15px",
			color: "var(--secondaryColor)",
			height: "600px",
			width: "15%",
			overflowY: "scroll",
			display: "flex",
			flexDirection: "column",
			backgroundColor: "var(--altTertiary)",
			minHeight: "100%",
			borderRadius: "15px",
			alignContent: "center",
			alignItems: "center",
		},
		inputBoxContainer: {
			display: "flex",
			flexDirection: "row",
			width: "100%",
			flexWrap: "wrap",
			alignContent: "center",
			justifyContent: "center",
			alignItems: "center",
		},
		formBox: {
			display: "flex",
			flexDirection: "column",
			flexWrap: "wrap",
			alignSelf: "flex-end",
			alignItems: "stretch",
			width: "61%",
			marginLeft: "18px",
		},
		customRoomBox: {
			display: "flex",
			flexDirection: "column",
			flexWrap: "wrap",
			alignSelf: "flex-end",
			alignItems: "stretch",
			width: "15%",
		},
		messageInput: {
			color: "goldenrod",
			background: "var(--altTertiary)",
			borderRadius: "5px",
			"&::placeholder": {
				color: "var(--secondaryColor)",
			},
		},
		buttonInput: {
			backgroundColor: "goldenrod",
			border: "2px solid darkgoldenrod",
			color: "rgb(3,0,165)",
			borderRadius: "5px",
		},
		joinBox: {
			margin: "15px",
			backgroundColor: "var(--secondaryColor)",
			width: "15%",
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			height: "600px",
			flexDirection: "column",
			backgroundColor: "var(--altTertiary)",
			maxWidth: "15%",
			borderRadius: "15px",
		},
		roomButtons: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			width: "100%",
			padding: "25px 2px 25px 0",
			color: "var(--secondaryColor)",
			alignSelf: "center",
			"&:hover": {
				backgroundColor: "var(--secondaryColor)",
				color: "goldenrod",
			},
		},
		roomHeader: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			alignContent: "center",
			alignSelf: "center",
			width: "100%",
			color: "var(--secondaryColor)",
		},
		roomName: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			alignContent: "center",
			alignSelf: "center",
			color: "var(--secondaryColor)",
			fontSize: "65px",
			margin: 0,
		},
	});

	const SENDER = {
		name: chatter,
	};

	// const makeUsers = () => {
	//    const users = chatter.map((summoner) => {});

	// }

	const chatRooms = [
		"ARAM",
		"Ranked",
		"Duo",
		"LCS",
		"Patch Notes",
		"Post Games",
		"Global Chat Room",
	];

    const chatRooms = [
        "Global Chat Room",
        "ARAM",
        "Ranked",
        "Duo",
        "LCS",
        "Patch Notes",
        "Post Games",
    ];
	useEffect(() => {
		if (token) {
			initiateSocketConnection(token);
			subscribeToMessages((err, data) => {
				setMessages((prev) => [...prev, data]);
			});
			return () => {
				disconnectSocket();
			};
		}
	}, [token]);

	// submits message and appends it to the server and the client
	const submitMessage = (e) => {
		e.preventDefault();
		const message = inputRef.current.value;
		sendMessage({ message, roomName: room }, (cb) => {
			// callback is acknowledgement from server

			messages.push({
				message,
				...SENDER,
			});
			setMessages(messages);
			// clear the input after the message is sent
			inputRef.current.value = "";
		});
	};

	// handles joining room names
	const handleCustomRoom = (e) => {
		leaveRoom(room);
		setRoom(e.target.value);
	};

	const joinCustomRoom = () => {
		// joins new room
		joinRoom(room);
		// sets new room
		setRoom(room);
		// clears old messages when joining a new room
		setMessages([]);
		joinRef.current.value = "";
	};

	// room join function
	const joinChatRoom = (e) => {
		e.preventDefault();
		const newRoom = e.target.innerText;
		if (room != newRoom) {
			leaveRoom(room);
			joinRoom(newRoom);
		}
		setRoom(newRoom);
		setMessages([]);
	};
	const classes = useStyles();

	return (
		<Container className={classes.fontContainer}>
			<Box className={classes.roomName}>{room}</Box>
			<Box className={classes.contain}>
				<Box className={classes.joinBox}>
					<Box className={classes.roomHeader}>
						<h2>Rooms!</h2>
					</Box>

					<Box onClick={(e) => joinChatRoom(e)}>
						{chatRooms.map((room) => {
							return (
								<Button className={classes.roomButtons} key={room}>
									{room}
								</Button>
							);
						})}
					</Box>
				</Box>
				<Box className={classes.box}>
					{messages
						.filter((message) => message.message)
						.map((message) => {
							const highlightStyle = {
								background: "navy",
								border: "2px solid var(--primaryColor)",
								margin: "5px",
								padding: "8px",
								borderRadius: "20px",
								width: "fit-content",
								fontWeight: 700,
								fontSize: "large",
								alignSelf: "flex-start",
							};
							if (SENDER.name !== message.name) {
								highlightStyle.color = "blue";
								highlightStyle.backgroundColor = "var(--primaryColor)";
								// highlightStyle.display = "flex";
								// highlightStyle.justifyContent = "flex-end";
								highlightStyle.alignSelf = "flex-end";
								highlightStyle.border = "2px solid navy";
								highlightStyle.borderRadius = "20px";
								highlightStyle.margin = "5px";
								highlightStyle.padding = "8px";
								highlightStyle.width = "fit-content";
							}
							return (
								<Box key={message.id} style={highlightStyle}>
									{message.name}: <br />
									{message.message}
								</Box>
							);
						})}
				</Box>
				<Box className={classes.peopleBox}>
					<h4>People In Room </h4>
					{/* //! check out all sumnames here cant figure out how to map the data
					correctly. */}
					{/* {SENDER.name((summoners) => {
                            return ( */}
					<Box>
						<h5>{chatter}</h5>
					</Box>
					{/* )
                        })} */}
				</Box>
			</Box>
			<Box className={classes.inputBoxContainer}>
				<Box className={classes.customRoomBox}>
					<input
						className={classes.messageInput}
						type="text"
						placeholder="Custom Room Name"
						ref={joinRef}
						onChange={handleCustomRoom}
					/>
					<button
						className={classes.buttonInput}
						onClick={() => joinCustomRoom()}
					>
						Join Room
					</button>
				</Box>
				<form className={classes.formBox} onSubmit={submitMessage}>
					<input
						className={classes.messageInput}
						type="text"
						placeholder="Start Messaging"
						ref={inputRef}
					/>
					<button className={classes.buttonInput} type="submit">
						Submit
					</button>
				</form>
			</Box>
		</Container>
	);
}

export default Chat;
