import '../styles/globals.css'
import { userContext } from '../contexts/userContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    user: {},

    setUser: (dataUser) => {
      setState({ user: dataUser })
    }

  })

  return (
    <userContext.Provider value={state}>
      <Component {...pageProps} />
    </userContext.Provider>
  )
}

export default MyApp
