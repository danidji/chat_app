import Head from 'next/head'

import styles from '../styles/Home.module.css'
import { useContext } from 'react';


import Content from '../components/Content'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'

import { fetchData } from '../services/request';

import { userContext } from '../contexts/userContext';

import Register from '../components/Register';


export const getServerSideProps = async () => {
    const data = await fetchData();
    // console.log(`getServerSideProps -> data`, data)

    return {
        props: data
    }
}


export default function Chat(props) {

    //chargement des contextes 
    const context = useContext(userContext);

    return (
        <div className={styles.container}>

            <Layout content={<Content />} sidebar={<Sidebar room={props.rooms} />} />

        </div >
    )
    // }




}
