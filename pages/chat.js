import Head from 'next/head'

import styles from '../styles/Home.module.css'
// console.log(`styles`, styles)


import Content from '../components/Content'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'


export default function Chat() {
    return (
        <div className={styles.container}>


            <Layout content={<Content />} sidebar={<Sidebar />} />


        </div >
    )
}
