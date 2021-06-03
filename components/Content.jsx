import React from 'react';
import styles from '../styles/Home.module.css'

function Content(props) {
    return (
        <main className={styles.main}>

            <h1 className={styles.title}>
                Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>

            <p className={styles.description}>
                Get started by editing{' '}
                <code className={styles.code}>pages/index.js</code>
            </p>
        </main>
    )
}

export default Content;
