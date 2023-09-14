import React from 'react';
import classes from './FormHeader.module.css';

function FormHeader(props) {
    return (
        <div className={classes.headerDiv}>
            <h1> {props.headerText} </h1>
        </div>
    );
}

export default FormHeader;