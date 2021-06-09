import '../styles/globals.css';
import Head from 'next/head';
import { userContext } from '../contexts/userContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    user: {},
    myRoom: null,
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
      <Head>
        <title>ChatApp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://api.fontshare.com/css?f[]=synonym@300,400&display=swap" rel="stylesheet"></link>
      </Head>
      <Component {...pageProps} />
    </userContext.Provider>
  )
}

export default MyApp
