import React, { useContext, useState } from 'react';
import styles from '../styles/Conversation.module.css'

import ContentMessage from './ContentMessage'
import { userContext } from '../contexts/userContext';
import { SocketContext } from '../contexts/socketContext';

function Content(props) {

    //chargement du contexte usercd 
    const context = useContext(userContext);
    const socket = useContext(SocketContext)
    // console.log(`Content -> context`, context.myRoom)

    const [state, setState] = useState({
        message: "",
        msgList: []
    })

    let tab = [];

    const handleChange = (e) => {

        // console.log(`handleChange -> e`, e.target.value)
        setState({ ...state, message: e.target.value })
    }

    const handleClick = () => {
        // au click j'envoie un évènement message au serveur socket 
        let newMsg = {
            id_msg: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}_${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
            content_msg: state.message,
            // roomId: context.myRoom.id
        }

        socket.emit("envoi message", newMsg, context.user, context.myRoom)
        // console.log(`handleClick -> context.user`, context.user)
        setState({ ...state, message: "" })

    }

    //ecoute de serveur web socket
    socket.on("reception message", (message) => {
        // console.log(`socket.on -> message`, message)

        let present = false
        tab = state.msgList;
        // console.log(`socket.on -> tab`, tab)
        tab.forEach(element => {
            if (element.message.id_msg === message.message.id_msg) {
                // console.log(`message ====>`, message.message.content_msg)
                present = true;
            }
        })
        if (!present) {
            tab.push(message);
            setState({ ...state, msgList: tab });
            context.setConversation(context.myRoom.id, message)

        }


    })

    console.log('conversation ===>', context.conversation)
    const displayMessages = () => {
        return (
            state.msgList.map((element, i) => {

                return (
                    <div key={i}>

                        <div className="test"> {element.from_id}</div>
                        <div className="test" key={i}>{element.message.content_msg} </div>
                    </div>
                )
            })
        )
    }
    console.log(`socket.on -> tab`, state.msgList)
    return (
        <main className={styles.main}>

            <header className={styles.header}>
                <h4>{context.myRoom.name}</h4>
            </header>
            <div className={styles.content_convers}> Ma conversation</div>
            {displayMessages()}
            {context.myRoom.name &&

                <ContentMessage handleChange={handleChange} onClick={handleClick} value={state.message} />
            }

        </main>
    )
}

export default Content;
