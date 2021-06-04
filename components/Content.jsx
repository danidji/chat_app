import React from 'react';
import styles from '../styles/Layout.module.css'

import ContentMessage from './ContentMessage'

function Content(props) {

    const handleChange = (e) => {

        // console.log(`handleChange -> e`, e.target.value)
    }

    return (
        <main className={styles.main}>

            <header className={styles.header}>
                <h4>Ouvrir une conversation</h4>
            </header>
            <div className={styles.content_convers}> Ma conversation</div>
            <ContentMessage handleChange={handleChange} />

        </main>
    )
}

export default Content;
