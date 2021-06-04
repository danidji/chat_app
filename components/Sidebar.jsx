import React from 'react';
import styles from '../styles/Layout.module.css'
import Image from 'next/image'

// import { fetchData } from '../services/request';
import instance from '../services/axiosInstance';




const fetchData = async () => await instance.get('/api/rooms').then((result) => {
    // console.log(`fetchData -> result`, result)
    return {
        error: false,
        rooms: result.data
    }
}).catch((err) => {
    return {
        error: true,
        rooms: []
    }
});

export const getServerSideProps = async () => {
    const data = await fetchData();
    console.log(`getServerSideProps -> data`, data)

    return {
        props: "toto"
    }
}

function Sidebar(props) {

    console.log('Props ==> ', props);

    return (
        <>
            <div className={styles.title}>
                <h4>Mes conversations</h4>
            </div>
        </>
    )
}

export default Sidebar;
