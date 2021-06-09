import PropTypes from "prop-types";
import React from 'react';
import styles from '../styles/Conversation.module.css'

function UserList({ allUsers }) {

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