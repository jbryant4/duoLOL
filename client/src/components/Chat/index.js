import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Box, Container, Button } from '@material-ui/core';
import {
    subscribeToMessages,
    initiateSocketConnection,
    disconnectSocket,
    sendMessage,
    joinRoom,
    leaveRoom,
} from "./socketIo.service";
import AuthService from '../../utils/auth'
import { borderBottom } from '@material-ui/system';


function Chat() {

    const [messages, setMessages] = useState([]);
    const inputRef = useRef("");
    const joinRef = useRef("");
    const [room, setRoom] = useState('Global Chat Room');
    // const [leave, setLeave] = useState('myRandomChatRoomId');

    const token = AuthService.getToken();
    // console.log(token)

    const useStyles = makeStyles({
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
            width: "75%",
            overflow: "scroll",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "2px solid goldenrod",
            backgroundImage: `url(/images/testRoom.jpg)`,
            minHeight: "100%",
            minWidth: "75%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",

        },
        formBox: {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            width: "75%",
            alignContent: "center",
            flexWrap: "wrap",
        },
        customRoomBox: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "stretch",
        },
        messageInput: {
            color: "goldenrod",
            background: "rgba(3, 0, 165, 0.3)",
            border: "2px solid darkgoldenrod",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        buttonInput: {
            backgroundColor: "goldenrod",
            border: "2px solid darkgoldenrod",
            color: "rgb(3,0,165)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        joinBox: {
            margin: "30px",
            border: "2px solid goldenrod",
            backgroundColor: "rgba(3, 0, 165, 0.3)",
            width: "15%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "600px",
            flexDirection: "column",
            backgroundImage: `url(/images/testRoom.jpg)`,
            maxWidth: "15%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        roomButtons: {
            display: "flex",
            opacity: 0.85,
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid goldenrod",
            width: "100%",
            margin: "38px 0 20px 0",
            background: "darkgoldenrod",
            color: "rgba(3, 0, 165, 1)",
            '&:hover': {
                backgroundColor: 'rgba(3, 0, 165, 0.5)',
                color: 'goldenrod',
            },
        },
        roomHeader: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            border: "2px solid goldenrod",
            width: "100%",
            background: "darkgoldenrod",
            color: "rgba(3, 0, 165, .75)",
            opacity: 0.85
        },
        roomName: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            color: "rgba(3, 0, 165, .75)",
            fontSize: "65px",
            margin: 0 ,
            fontFamily: "'STIX Two Text', serif",
        }
    });

    //! needs to be replaced with the user
    const SENDER = {
        //id: "123",
        name: "Cody Hebert",
    };

    const chatRooms = ["ARAM", "Ranked", "Duo", "LCS", "Patch Notes", "Post Games"]

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
            console.log(cb);
            messages.push({
                message,
                ...SENDER
            })
            setMessages(messages);
            // clear the input after the message is sent
            inputRef.current.value = "";
        });
    };



    // handles joining room names
    const handleInputChange = (e) => {
        setRoom()
    }

    // room join function
    const joinChatRoom = (e) => {
        e.preventDefault();
        const newRoom = e.target.innerText;
        if (room != newRoom) {
            leaveRoom(room);
            joinRoom(newRoom);
        }

        setRoom(newRoom);
        setMessages(['new room'])
        joinRef.current.value = "";
    }
    const classes = useStyles();

    return (
        <Container>
                <Box className={classes.roomName}>
                    {room}
                </Box>
            <Box className={classes.contain}>
                <Box className={classes.joinBox}>
                    <Box className={classes.roomHeader}>
                        <h2>Rooms!</h2>
                    </Box>

                    <Box onClick={(e) => joinChatRoom(e)}>
                        {chatRooms.map(room => {
                            return (
                                <Button className={classes.roomButtons} key={room}>{room}</Button>

                            )
                        })}
                    </Box>

                </Box>
                <Box className={classes.box}>
                    {messages.filter(message => message.message).map((message) => {
                        const highlightStyle = {
                            background: "navy",
                            border: "2px solid goldenrod",
                            margin: "5px",
                            padding: "5px",
                            borderRadius: "20px",
                            opacity: 0.75
                        }
                        if (SENDER.name !== message.name) {
                            highlightStyle.color = "blue"
                            highlightStyle.backgroundColor = "darkgoldenrod"
                            highlightStyle.opacity = 0.75
                            highlightStyle.display = "flex"
                            highlightStyle.justifyContent = "flex-end"
                            highlightStyle.border = "2px solid navy"
                            highlightStyle.borderRadius = "20px"
                            highlightStyle.margin = "5px"
                            highlightStyle.padding = "5px"
                        }
                        return (
                            <Box key={message.id}
                                style={highlightStyle}>
                                {message.name}: <br />
                                {message.message}
                            </Box>
                        )
                    })}

                </Box>
                <Box className={classes.customRoomBox}>
                    <input className={classes.messageInput} type="text" placeholder="Custom Room Name" ref={joinRef} onChange={handleInputChange} />
                    <button className={classes.buttonInput} onSubmit={() => joinChatRoom()}>Join Room</button>
                </Box>
                <form className={classes.formBox} onSubmit={submitMessage}>
                    <input className={classes.messageInput} type="text" placeholder="Start Messaging" ref={inputRef} />
                    <button className={classes.buttonInput} onSubmit={() => joinChatRoom()} type="submit">Submit</button>
                </form>
            </Box>
        </Container>
    )

}

export default Chat;