import { io } from 'socket.io-client';

let socket;

// initiates socket connection with auth
export const initiateSocketConnection = (token) => {
	socket = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
		auth: {
			token,
		},
	});
	
	console.log(`Connecting socket...`);
};

// disconnects socket connection
export const disconnectSocket = () => {
	console.log('Disconnecting socket...');
	if (socket) socket.disconnect();
}