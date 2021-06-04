import React from 'react';
import socketIOClient from 'socket.io-client';


const socket = socketIOClient('http://localhost:6061');

export const SocketContext = React.createContext(socket)