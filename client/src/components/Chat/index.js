import React, { useEffect, useRef, useState } from 'react';
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

    // const [tokens, setToken] = useState("");
    const [messages, setMessages] = useState([]);
    const inputRef = useRef("");
    const joinRef = useRef("");
    const [join, setJoin] = useState('myRandomChatRoomId');
    const [leave, setLeave] = useState('myRandomChatRoomId');

    const token = AuthService.getToken();
    // console.log(token)

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


    return (
        <div>
            <input type="text" placeholder="Type in text" ref={joinRef} onChange={handleInputChange} />
            <button onClick={() => joinChatRoom()}>Join Room</button>
            <div className="box">
                <div className="messages">
                    {console.log(messages)}
                    {messages.map((user, i) => {
                        //! fix random div popping up
                        if (i % 2 === 0) {
                            return (
                                <div key={user.id}>
                                    {user.name}: {user.message}
                                </div>
                            )
                        }
                    })}
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