import Head from 'next/head'

import styles from '../styles/Home.module.css'
// console.log(`styles`, styles)


import Content from '../components/Content'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'

import Register from '../components/Register';


export default function Home() {
  return (
    <div className={styles.container}>

      <Register />


    </div >
  )
}
