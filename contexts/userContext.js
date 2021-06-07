import React, { createContext } from 'react';

export const userContext = createContext({
    user: {},
    myRoom: {},
    conversation: [],
    setUser: (dataUser) => { },
    setMyRoom: (roomData) => { },
    setConversation: (roomID, messageList) => { }
})