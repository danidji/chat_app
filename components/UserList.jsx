import PropTypes from "prop-types";
import React, { useContext } from 'react';
import styles from '../styles/Conversation.module.css';
import { userContext } from '../contexts/userContext';

import { SocketContext } from "../contexts/socketContext";


function UserList({ userConnected }) {

    const displayUser = () => {
        return (
            userConnected.map((user, i) => {
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
    userConnected: PropTypes.array
}

export default UserList;