import React from 'react';
import { useState } from 'react';
import "./form.css";
import Dank from "./Dank.js/Dank";
import FormInput from './FormInput/FormInput';

export default function ContactForm(props) {
    const [submitted, toggleSubmitted] = useState(false);
    const styles = {
        component: {
            width: props.version === "desktop" ? "50%" : "90%",
            height: "fit-content",
            marginBottom: "15vh",

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
        },
    }
    const handleToggle = () => {
        toggleSubmitted(!submitted);
    }
    return (
        <div style={styles.component}>
            {submitted ? <Dank version={props.version}/> : <FormInput version={props.version} handleToggle={handleToggle}/>}

        </div>
    )
}




