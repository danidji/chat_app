import React, { createContext } from 'react';

export const userContext = createContext({
    user: {},
    setUser: (dataUSer) => { }
})