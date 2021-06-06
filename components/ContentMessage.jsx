import React from 'react';
import styles from '../styles/Layout.module.css'

function ContentMessage(props) {
    return (
        <div className={styles.content_message}>
            <input
                type="text"
                name="text_message"
                className={styles.text_message}
                onChange={props.handleChange}
                value={props.value}
            />

            <button className="send_message" onClick={props.onClick}> Envoyer </button>
        </div>


    )
}

export default ContentMessage;