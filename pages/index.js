import Head from 'next/head'
import React, { useContext } from 'react';
import { userContext } from '../contexts/userContext';

import styles from '../styles/Home.module.css'

// Component
import Content from '../components/Content'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Register from '../components/Register';

//Functions
import { fetchData } from '../services/request';

//On expose dans les props le retour de la requete fetchData
export const getServerSideProps = async () => {
  const data = await fetchData();
  return {
    props: data
  }
}



export default function Home(props) {

  const context = useContext(userContext);
  const user = context.user;

  return (
    <div className={styles.container}>

      {user.id !== undefined

        ? (
          <div className={styles.container}>

            <Layout content={<Content />} sidebar={<Sidebar room={props.rooms} />} />

          </div >
        )
        : (
          <Register />
        )
      }


    </div >
  )
}
