import { useLocation } from 'react-router-dom';
import React from 'react';
import FormHeader from "./FormComponents/FormHeader/FormHeader";
import FormBody from "./FormComponents/FormBody/FormBody";
import classes from './FormPage.module.css'

function FormPage() {
    const location = useLocation();

    //JSX CODE---------------------------------------------------------------
    return (
        <div className={classes.mainContainer}>
            <FormHeader headerText={location.state.headerText} />
            <FormBody pageId={location.state.id} buttonText={location.state.buttonText} />
        </div>
    );
}

export default FormPage;