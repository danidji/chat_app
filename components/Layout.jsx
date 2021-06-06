import React from 'react';
import styles from '../styles/Layout.module.css'

function Layout({ content, sidebar }) {
    return (
        <div className={styles.layout}>
            <>
                {sidebar}
            </>
            <div className={styles.content}>
                {content}
            </div>
        </div >
    )
}

export default Layout;
