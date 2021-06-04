import React from 'react';
import styles from '../styles/Layout.module.css'
import Image from 'next/image'

function Sidebar(props) {
    return (
        <>
            <div className={styles.title}>
                <h4>Mes conversations</h4>
            </div>
        </>
    )
}

export default Sidebar;
