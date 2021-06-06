import '../styles/globals.css'
import { userContext } from '../contexts/userContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    user: {},
    myRoom: {},


    setUser: (dataUser) => {
      setState((state) => ({ ...state, user: dataUser }));
    },
    setMyRoom: (roomData) => {
      setState((state) => ({ ...state, myRoom: roomData }));
    }
  })

  return (
    <userContext.Provider value={state}>
      <Component {...pageProps} />
    </userContext.Provider>
  )
}

export default MyApp
