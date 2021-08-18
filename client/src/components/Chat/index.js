import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Box, Container } from '@material-ui/core';
import {
    subscribeToMessages,
    initiateSocketConnection,
    disconnectSocket,
    sendMessage,
    joinRoom,
    leaveRoom,
} from "./socketIo.service";
import AuthService from '../../utils/auth'


function Chat() {

    const [messages, setMessages] = useState([]);
    const inputRef = useRef("");
    const joinRef = useRef("");
    const [join, setJoin] = useState('myRandomChatRoomId');
    const [leave, setLeave] = useState('myRandomChatRoomId');

    const token = AuthService.getToken();
    // console.log(token)

    const useStyles = makeStyles({
        contain: {
            width: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: "goldenrod",
            backgroundColor: "rgba(3, 0, 165, 0.3)",
            flexWrap: "wrap",
            border: "2px solid goldenrod",
        },
        box: {
            color: "goldenrod",
            height: "600px",
            width:"100%",
            overflow: "scroll",
            overflowX: "hidden",
            display: "flex",
            flexDirection:"column",
        },
        formBox: {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            width: "100%",        
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
    });

    //! needs to be replaced with the user
    const SENDER = {
        //id: "123",
        name: "Cody Hebert",
    };

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
        sendMessage({ message, roomName: join }, (cb) => {
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
        setJoin(e.target.value)
    }

    // room join function
    const joinChatRoom = () => {
        leaveRoom(leave);
        joinRoom(join);
        setLeave(join);
        setMessages([])
        joinRef.current.value = "";
    }
    const classes = useStyles();

    return (
        <Container className={classes.contain}>
            {/* <input type="text" placeholder="Type in text" ref={joinRef} onChange={handleInputChange} />
            <button onClick={() => joinChatRoom()}>Join Room</button> */}
            {/* <Box > */}
                <Box className={classes.box}>
                    {console.log(messages)}
                    {messages.filter(message => message.message).map((message, i) => {
                    const highlightStyle = {
                    }
                    if(SENDER.name !== message.name){
                        highlightStyle.color="blue"
                        highlightStyle.backgroundColor="darkgoldenrod"
                    }
                    return (
                                <Box  key={message.id}
                                style={highlightStyle}>
                                    {message.name}: {message.message}
                                </Box>
                            )
                    })}
                </Box>
                {/* <Box> */}
                    <form className={classes.formBox} onSubmit={submitMessage}>
                        <input className={classes.messageInput} type="text" placeholder="Start Messaging" ref={inputRef} />
                        <button className={classes.buttonInput} type="submit">Submit</button>
                    </form>
                {/* </Box> */}
            {/* </Box> */}
        </Container>
    )

}

export default Chat;