import React, { useEffect, useState, useContext } from 'react';
import styles from '../styles/Sidebar.module.css'
import Image from 'next/image'

import { userContext } from '../contexts/userContext';
import { SocketContext } from "../contexts/socketContext";

import { GrPowerForceShutdown } from "react-icons/gr";
import { AiOutlinePoweroff } from "react-icons/ai";

// import clsx from 'clsx';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';



function Sidebar(props) {
    // console.log(`Sidebar -> props`, props)
    const [state, setState] = useState({
        roomData: [],
        actualRoom: "",
        myRooms: []
    })

    const context = useContext(userContext);
    const socket = useContext(SocketContext);

    useEffect(() => {

        setState({ ...state, roomData: props.room });
    }, [])

    /*************************************************************
     * ECOUTE DES SOCKETS EVENT
     */
    socket.off("salon rejoint").on("salon rejoint", (roomId) => {
        // console.log(`socket.off -> roomId`, roomId)
        if (!socket.rooms) {
            socket.rooms = [];
        }
        if (!socket.rooms.includes(roomId)) {
            socket.rooms.push(roomId.roomId);
        }

        setState({ ...state, myRooms: socket.rooms });


        console.log('STATE ===> ', state);
    })

    socket.off("salon quitté").on("salon quitté", (roomId) => {

        if (socket.rooms && socket.rooms.includes(roomId)) {
            socket.rooms = socket.rooms.filter(element => element !== roomId)
            setState({ ...state, myRooms: socket.rooms })

        }
    })


    /**
     * FONCTIONS 
     */

    const handleClik = (room) => {
        // ===> au click
        //j'envoi ma room dans mon context pour que les infos soit récupérer dans mon composant content msg
        // structure room : { id , name, description}
        context.setMyRoom(room);

        // if (socket.rooms) {

        // Stockage des données dans le socket
        socket.room = room
        // console.log(`handleClik -> socket`, socket)
        let data = {
            user: context.user //{id, pseudo, age, description}
            , room: room
        }
        socket.emit('rejoindre salon', data)
        // console.log(`handleClik -> socket`, socket)
        setState({ ...state, actualRoom: room.id });

        // }




    }

    const handleLeaveRoom = (e, roomId) => {
        console.log(`handleLeaveRoom -> roomId`, roomId)
        e.stopPropagation();

        let data = {
            roomId: roomId,
            user: context.user
        }

        if (state.actualRoom === roomId) {
            setState({ ...state, actualRoom: "" });
            context.setMyRoom(null)
        }

        socket.emit("quitter salon", data)
    }

    // console.log(state.actualRoom)
    const getRoomElement = () => {
        return (
            state.roomData.map((room, i) => {
                return (
                    <li className={`${styles.room_element} ${state.actualRoom === room.id && styles.active}`} key={i} onClick={() => handleClik(room)}>
                        <div className={styles.infos_room}>
                            <h5 className={styles.info}>{room.name}</h5>
                            <p className={`${styles.info} ${styles.para}`}>{room.description}</p>
                        </div>
                        <button
                            data-tip={state.myRooms.includes(room.id) ? "Quitter salon" : ""}
                            className={`${styles.leave_room} ${state.myRooms.includes(room.id) && styles.room_on}`}
                            onClick={(e) => handleLeaveRoom(e, room.id)}
                        >
                            <ReactTooltip /><AiOutlinePoweroff />
                        </button>
                    </li >
                )
            })

        )
    }
    return (
        <div className={styles.sidebar}>
            <h4 className={styles.title}>Mes conversations</h4>
            <ul className={styles.room_list}>
                {getRoomElement()}
            </ul>
        </div>
    )
}

Sidebar.propTypes = {
    room: PropTypes.array
}

export default Sidebar;
