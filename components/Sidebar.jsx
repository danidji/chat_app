import React, { useEffect, useState, useContext } from 'react';
import styles from '../styles/Sidebar.module.css'
import Image from 'next/image'

import { userContext } from '../contexts/userContext';
import { SocketContext } from "../contexts/socketContext";



function Sidebar(props) {
    // console.log(`Sidebar -> props`, props)
    const [state, setState] = useState({
        roomData: []
    })

    const context = useContext(userContext);
    const socket = useContext(SocketContext);

    useEffect(() => {

        setState({ ...state, roomData: props.room })
    }, [])


    console.log(context)

    const handleClik = (room) => {
        // ===> au click
        //j'envoi ma room dans mon context pour que les infos soit récupérer dans mon composant content msg
        context.setMyRoom(room);

        // je réalise une connection au serveur web socket
        socket.emit('rejoindre salon', {
            user: context.user,
            myRoom: room
        })


    }


    const getRoomElement = () => {
        return (
            state.roomData.map((room, i) => {
                return (
                    <div className={styles.room_element} key={i} onClick={() => handleClik(room)}>

                        <p className={styles.info}>{room.name}</p>
                        <p className={styles.info}>{room.description}</p>

                    </div>
                )
            })

        )
    }
    return (
        <div className={styles.sidebar}>
            <h4 className={styles.title}>Mes conversations</h4>
            <div className={styles.room_list}>
                {getRoomElement()}
            </div>
        </div>
    )
}

export default Sidebar;
