import React, { useContext, useState } from 'react';
import styles from '../styles/Conversation.module.css'

import ContentMessage from './ContentMessage'
import { userContext } from '../contexts/userContext';
import { SocketContext } from '../contexts/socketContext';

function Content(props) {

    //chargement du contexte user
    const context = useContext(userContext);
    const socket = useContext(SocketContext)
    // console.log(`Content -> context`, context.myRoom)

    const [state, setState] = useState({
        message: ""
    })


    const handleChange = (e) => {

        // console.log(`handleChange -> e`, e.target.value)
        setState({ ...state, message: e.target.value })
    }

    const handleClick = () => {
        // au click j'envois un évènement message au serveur socket 
        socket.emit("envoi message", state.message, context.user, context.myRoom)
        // console.log(`handleClick -> context.user`, context.user)
        setState({ ...state, message: "" })

    }

    //ecoute de serveur web socket
    socket.on("reception message", (message) => {
        console.log(`socket.on -> message`, message)

    })


    return (
        <main className={styles.main}>

            <header className={styles.header}>
                <h4>{context.myRoom.name}</h4>
            </header>
            <div className={styles.content_convers}> Ma conversation</div>

            {context.myRoom.name &&

                <ContentMessage handleChange={handleChange} onClick={handleClick} value={state.message} />
            }

        </main>
    )
}

export default Content;
