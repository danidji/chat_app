import '../styles/globals.css'
import { userContext } from '../contexts/userContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    user: {},
    myRoom: {},
    conversation: [],

    setUser: (dataUser) => {
      setState((state) => ({
        ...state, user: {
          id: `${dataUser.pseudo}_${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
          pseudo: dataUser.pseudo,
          age: dataUser.age,
          description: dataUser.description
        }
      }));
    },
    setMyRoom: (roomData) => {
      setState((state) => ({
        ...state, myRoom: roomData
      }));
    },
    setConversation: (roomID, messageList) => {
      let tab = state.conversation;
      tab.push({ roomID: roomID, messageList: messageList });

      setState({ ...state, conversation: tab })
    }

  })

  return (
    <userContext.Provider value={state}>
      <Component {...pageProps} />
    </userContext.Provider>
  )
}

export default MyApp
