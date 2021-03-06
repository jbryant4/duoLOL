import { io } from 'socket.io-client';

let socket;

// initiates socket connection with auth
export const initiateSocketConnection = (token) => {
	socket = io("https://cupidlolserver.herokuapp.com/", {
		auth: {
			token,
		},
	});
};

// disconnects socket connection
export const disconnectSocket = () => {
	if (socket) socket.disconnect();
}

// broadcast message to server on connection
export const subscribeToChat = (cb) => {
	socket.emit('my message', 'Hello there from React.');
	if (!socket) return (true);
	socket.on('my broadcast', msg => {
		console.log('Websocket event received!');
		return cb(null, msg);
	});
}

// Handle message receive event
export const subscribeToMessages = (cb) => {
	if (!socket) return (true);
	socket.on('message', msg => {
		console.log('Room event received!');
		return cb(null, msg);
	});
}

export const sendMessage = ({ message, roomName }, cb) => {
	if (socket) socket.emit('message', { message, roomName }, cb);
}

export const joinRoom = (roomName) => {
	socket.emit("join", roomName);

};

export const leaveRoom = (roomName) => {
	socket.emit("leave", roomName)
}