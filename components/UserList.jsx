import PropTypes from "prop-types";
import React, { useContext } from 'react';
import styles from '../styles/Conversation.module.css';
import { userContext } from '../contexts/userContext';

import { SocketContext } from "../contexts/socketContext";


function UserList({ allUsers }) {
    // console.log(`UserList -> allUsers`, allUsers)
    const socket = useContext(SocketContext);

    // console.log(`UserList -> socket`, socket)

    const displayUser = () => {
        return (
            allUsers.map((user, i) => {
                return (
                    <li key={i}>{user.pseudo}</li>
                )
            })
        )
    }

    return (

        <ul className={styles.user_list_content}>

            {displayUser()}

        </ul>

    )
}

UserList.propTypes = {
    UserList: PropTypes.array
}

export default UserList;