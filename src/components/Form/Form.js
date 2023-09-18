import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from "./Header/Header";
import Body from "./Body/Body";
import classes from './Form.module.css'

const Form = () => {
    const location = useLocation();

    //JSX CODE---------------------------------------------------------------
    return (
        <div className={classes.mainContainer}>
            <Header headerText={location.state.headerText} />
            <Body pageId={location.state.id} buttonText={location.state.buttonText} />
        </div>
    );
}

export default Form;