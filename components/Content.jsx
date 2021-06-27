import React, { useContext, useState } from 'react';
import styles from '../styles/Conversation.module.css'

import ContentMessage from './ContentMessage'
import { userContext } from '../contexts/userContext';
import { SocketContext } from '../contexts/socketContext';
import { CgUserlane } from "react-icons/cg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HeaderConvers from './HeaderConvers'

function Content(props) {

    //chargement des contextes 
    const context = useContext(userContext);
    const socket = useContext(SocketContext)
    // console.log(`Content -> socket=====>`, socket.room)
    // console.log(`Content -> context`, context.myRoom)

    const [state, setState] = useState({
        message: "",
        msgList: [],
        users: [],
        newUser: {},
    })

    let tab = [];


    /*************************************************************
     * ECOUTE DES SOCKETS EVENT
     */
    socket.off('A rejoint le salon').on('A rejoint le salon', (data) => {
        // console.log(`socket.off -> data`, data)
        // data : {newUser, users:[]}

        // let newUser = data.newUser;
        setState(() => ({ ...state, newUser: data.newUser }));
        // let allUser = data.users;
        setState(() => ({ ...state, users: data.users }));

        // console.log('Mon state ===> ', state);


        if (context.user.id !== data.newUser.id) {

            notify(data.newUser.pseudo);
        }


    })

    socket.off("reception message").on("reception message", (message) => {

        let present = false
        tab = state.msgList;
        tab.forEach(element => {
            if (element.message.id_msg === message.message.id_msg) {
                present = true;
            }
        })
        if (!present) {
            tab.push(message);
            setState({ ...state, msgList: tab });
            context.setConversation(context.myRoom.id, message)

        }
    })

    /************************************************************
     * FONCTIONS
     */

    const handleChange = (e) => {

        setState({ ...state, message: e.target.value })
    }

    const handleClick = () => {
        // au click j'envoie un évènement message au serveur socket 
        let newMsg = {
            id_msg: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}_${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
            content_msg: state.message,
            date: +new Date
        }

        socket.emit("envoi message", newMsg, context.user, socket.room)
        // console.log(`handleClick -> context.user`, context.user)
        setState({ ...state, message: "" })

    }

    const notify = (username) => {
        toast(`${username} est connecté au salon`)
    }

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
    // console.log(`socket.on -> tab`, state.msgList)
    return (
        <main className={styles.main}>

            <HeaderConvers allUsers={state.users} newUser={state.newUser} />

            <ToastContainer />
            {context.myRoom === null
                ? (<div className={styles.info_no_room}>
                    <CgUserlane className={styles.icon} />
                    <p>C'est plus fun de rejoindre un salon !</p>
                </div>)
                : (
                    <>
                        <div className="test">{displayMessages()}</div>
                        < ContentMessage handleChange={handleChange} onClick={handleClick} value={state.message} />
                    </>
                )
            }
        </main>
    )
}

export default Content;
