import React, { useContext } from 'react';
import styles from '../styles/Layout.module.css'

import ContentMessage from './ContentMessage'
import { userContext } from '../contexts/userContext';

function Content(props) {

    //chargement du contexte user
    const context = useContext(userContext);
    console.log(`Content -> context`, context)

    const handleChange = (e) => {

        // console.log(`handleChange -> e`, e.target.value)
    }

    return (
        <main className={styles.main}>

            <header className={styles.header}>
                <h4>Ouvrir une conversation {context.user.pseudo}</h4>
            </header>
            <div className={styles.content_convers}> Ma conversation</div>
            <ContentMessage handleChange={handleChange} />

        </main>
    )
}

export default Content;
