import React, { useContext, useState } from 'react';
import styles from '../styles/Conversation.module.css'
import { userContext } from '../contexts/userContext';

import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import UserList from './UserList';

import { FiUsers } from "react-icons/fi";



function HeaderConvers({ allUsers, newUser }) {
    // console.log(`HeaderConvers -> props`, prsops)
    const context = useContext(userContext);
    const [display, setDisplay] = useState(false)
    const handleClick = () => {
        console.log("user list ==> ", allUsers)
        setDisplay((prev) => (!prev))
    }

    return (
        <header className={styles.header}>

            {context.myRoom !== null &&
                <>

                    <h4>{context.myRoom.name}</h4>
                    <div className="user list">
                        <button
                            data-tip="Liste utilisateurs connectés"
                            className={styles.user_list}
                            onClick={handleClick}
                        >
                            <ReactTooltip /><FiUsers /><span>{allUsers.length}</span>
                        </button>
                        {display &&
                            < UserList allUsers={allUsers} />
                        }
                    </div>
                </>
            }
        </header>
    )
}

HeaderConvers.propTypes = {
    allUsers: PropTypes.array,
    newUser: PropTypes.object
}

export default HeaderConvers;