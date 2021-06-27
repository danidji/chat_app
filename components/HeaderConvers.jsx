import React, { useContext, useState } from 'react';
import styles from '../styles/Conversation.module.css'
import { userContext } from '../contexts/userContext';

import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import UserList from './UserList';

import { FiUsers } from "react-icons/fi";



function HeaderConvers({ allUsers, newUser }) {

    const context = useContext(userContext);
    const [display, setDisplay] = useState(false)

    //Afficher la liste des utilisateurs
    const handleClick = () => {
        setDisplay((prev) => (!prev))
    }

    //On récupère la liste des utilisateurs connectés sauf moi
    let allUserWithoutMe = allUsers.filter(user => user.id !== context.user.id)

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
                            <ReactTooltip /><FiUsers /><span>{allUsers.length - 1}</span>
                        </button>
                        {display &&
                            < UserList userConnected={allUserWithoutMe} newUser={newUser} />
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