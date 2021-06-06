import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { userContext } from '../contexts/userContext';


import styles from '../styles/Register.module.css'


export default function Register(props) {
    //gestion formulaire
    const { register, handleSubmit } = useForm();

    //redirection 
    const router = useRouter();

    //chargement du contexte user
    const context = useContext(userContext);


    const onSubmit = (data) => {
        // console.log(data);
        context.setUser(data);
        router.push("/chat");
    }


    return (
        <div className={styles.content_register}>

            <h1 className={styles.title1}>Bienvenue !</h1>
            <h3 className={styles.title3}>Enregistrez vous pour accéder au tchat :</h3>
            <form className={styles.form_register} onSubmit={handleSubmit(onSubmit)}>

                <input
                    className={styles.register}
                    placeholder="Taper votre pseudo"
                    required
                    {...register("pseudo")}
                />
                <input
                    className={styles.register}
                    placeholder="Quel age avez vous ?"
                    type="number"
                    {...register("age")}
                />
                <input
                    className={styles.register}
                    placeholder="Saisir une courte description"
                    {...register("description")}
                />

                <input className={styles.submit} value="Se connecter" type="submit" />

            </form>
        </div>
    )
}