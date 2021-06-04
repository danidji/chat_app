import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { userContext } from '../contexts/userContext';


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
        <form onSubmit={handleSubmit(onSubmit)}>

            <input
                placeholder="Taper votre pseudo"
                {...register("pseudo")}
            />
            <input
                placeholder="Quel age avez vous ?"
                type="number"
                {...register("age")}
            />
            <input
                placeholder="Saisir une courte description"
                {...register("description")}
            />
            <label htmlFor="gender">Sexe</label>
            <select value="default" {...register("gender")}>
                <option value="default" disabled ></option>
                <option value="female">Femme</option>
                <option value="male">Homme</option>
                <option value="other">Autre</option>
            </select>
            <input type="submit" />

        </form>
    )
}