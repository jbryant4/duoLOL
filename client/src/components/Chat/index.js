import React, { useEffect, useRef, useState } from 'react';
import {
    subscribeToMessages,
    initiateSocketConnection,
    disconnectSocket,
    sendMessage,
    joinRoom,
} from "./socketIo.service";
import AuthService from '../../utils/auth'


function Chat() {

    // const [tokens, setToken] = useState("");
    const [messages, setMessages] = useState([])
    const tokenInputRef = useRef("");
    const inputRef = useRef("");
    const joinRef = useRef("");
    const [join, setJoin] = useState('myRandomChatRoomId');
    const token = AuthService.getToken();
    console.log(token)

    // needs to be replaced with the user and its token
    const SENDER = {
        id: "123",
        name: "Cody Hebert",
    };

    useEffect(() => {
        if (token) {
            initiateSocketConnection(token);
            subscribeToMessages((err, data) => {
                console.log(data);
                setMessages((prev) => [...prev, data]);
            });
            return () => {
                disconnectSocket();
            };
        }
    }, [token]);

    // submits token typing it it want to auth durring log in to get rid of this function
    // const submitToken = (e) => {
    //     e.preventDefault();
    //     const tokenValue = tokenInputRef.current.value;
    //     setToken(tokenValue);
    // };

    // submits message and appends it to the server and the client
    const submitMessage = (e) => {
        e.preventDefault();
        const message = inputRef.current.value;
        sendMessage({ message, roomName: join }, (cb) => {
            // callback is acknowledgement from server
            console.log(cb);
            setMessages((prev) => [
                ...prev,
                {
                    message,
                    ...SENDER,
                },
            ]);
            // clear the input after the message is sent
            inputRef.current.value = "";
        });
    };

    // const onConnectMessage = (e) => {
    //   e.preventDefault();
    //   const mesInput = connectMessage.value

    //   if (mesInput === '') {
    //     return displayMessage(mesInput)
    //   }
    // }

    // const displayMessage = () => {

    //     const message = messages.value
    //     sendMessage({ message }, (cb) => {
    //         // callback is acknowledgement from server
    //         console.log(cb);
    //     })
    // }

    // handles joining room names
    const handleInputChange = (e) => {
        setJoin(e.target.value)
    }

    // room join function
    const joinChatRoom = () => {
        joinRoom(join)
        joinRef.current.value = "";
    }


    return (
        <div>
            <form>
                <input type="text" placeholder="Enter token" ref={tokenInputRef} />
                <button type="submit">Submit</button>
            </form>
            <input type="text" placeholder="Type in text" ref={joinRef} onChange={handleInputChange} />
            <button onClick={() => joinChatRoom()}>Join Room</button>
            <div className="box">
                <div className="messages">
                    {messages.map((user) => (
                        <div key={user.id}>
                            {user.name}: {user.message}
                        </div>
                    ))}
                </div>
                <form className="input-div" onSubmit={submitMessage}>
                    <input type="text" placeholder="Type in text" ref={inputRef} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )

}

export default Chat;