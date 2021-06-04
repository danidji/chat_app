import React, { createContext } from 'react';

export const userContext = createContext({
    user: {},
    myRoom: [],
    setUser: (dataUser) => { },
    setMyRoom: (roomData) => { }
})