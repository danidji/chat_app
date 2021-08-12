import React, { useContext, useState } from 'react';
import styles from '../styles/Conversation.module.css'


import { CgUserlane } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx';

import HeaderConvers from './HeaderConvers'
import ContentMessage from './ContentMessage'

import { SocketContext } from '../contexts/socketContext';
import { userContext } from '../contexts/userContext';
import { getFormatDate } from '../services/utiles';



function Content(props) {

    //chargement des contextes 
    const context = useContext(userContext);
    const socket = useContext(SocketContext);
    let user = context.user;

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
        // data : {newUser, users:[]}

        // let newUser = data.newUser;
        setState(() => ({ ...state, newUser: data.newUser }));
        // let allUser = data.users;
        setState(() => ({ ...state, users: data.users }));

        if (user.id !== data.newUser.id) {

            notify(data.newUser.pseudo);
        }


    })

    socket.off("reception message").on("reception message", (message) => {

        let messages = [...state.msgList];

        messages.push(message)
        setState({ ...state, msgList: messages })

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

        socket.emit("envoi message", newMsg, user, socket.room)
        setState({ ...state, message: "" })

    }

    const notify = (username) => {
        toast(`${username} est connecté au salon`)
    }

    // Génère l'affichage des messages
    const displayMessages = () => {
        return (
            <div className={styles.content_conversation}>
                {state.msgList.map((element, i) => {

                    const format = getFormatDate(element.date);

                    // console.log(`MON OBJET DATE ==>`, getFormatDate(element.date))


                    return (
                        <div className={clsx('message', element.from.id === user.id ? styles.msg_right : styles.msg_left)} key={i}>
                            <div className="msg_from"> {element.from.id === user.id ? 'moi' : element.from.pseudo}</div>
                            <div className="msg_text">{element.content_msg} </div>
                            <div className="msg_date">{format.heure} </div>

                        </div>
                    )
                })}
            </div>
        )
    }


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
                        {displayMessages()}
                        < ContentMessage handleChange={handleChange} onClick={handleClick} value={state.message} />
                    </>
                )
            }
        </main>
    )
}

export default Content;
