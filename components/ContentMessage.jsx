import React from 'react';
import styles from '../styles/Conversation.module.css'
import { BiSend } from "react-icons/bi";

function ContentMessage(props) {
    return (
        <div className={styles.content_message}>
            <input
                type="text"
                name="text_message"
                placeholder="Tapez un message"
                className={styles.text_message}
                onChange={props.handleChange}
                value={props.value}
            />

            <button className={styles.send_message} onClick={props.onClick}><BiSend /></button>
        </div>



    )
}

export default ContentMessage;