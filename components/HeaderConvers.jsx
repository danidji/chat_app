import React, { useContext, useState } from 'react';
import styles from '../styles/Conversation.module.css'
import { userContext } from '../contexts/userContext';

import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import UserList from './UserList';

import { FiUsers } from "react-icons/fi";



function HeaderConvers({ allUsers, newUser }) {
    // console.log(`HeaderConvers -> allUsers`, allUsers)
    // console.log(`HeaderConvers -> newUser`, newUser)

    const context = useContext(userContext);
    const [display, setDisplay] = useState(false)
    const user = context.user;

    //Afficher la liste des utilisateurs
    const handleClick = () => {
        // console.log("user list ==> ", allUsers)
        setDisplay((prev) => (!prev))
    }

    // const test = (user) => {
    //     console.log(`test -> user`, user)
    //     return user !== newUser

    // }

    // allUsers.forEach(element => {
    //     if (element.id !== user.id) {
    //         // console.log(`HeaderConvers -> element.id !== newUser.id`, element.id !== user.id)
    //         // console.log(`HeaderConvers -> context`, context)
    //         console.log('USER ===>', element);
    //     }
    // });

    // let allUserWithoutUser = allUsers.filter(user => user.id !== newUser.id)
    // // let allUserWithoutUser = allUsers.filter(test);
    // console.log(`HeaderConvers -> allUserWithoutUser`, allUserWithoutUser)

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
                            < UserList allUsers={allUsers} newUser={newUser} />
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