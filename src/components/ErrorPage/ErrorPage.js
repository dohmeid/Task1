import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ErrorPage.module.css';

const ErrorPage = () => {

    const navigate = useNavigate();
    const buttonClickHandler = () => {
        navigate('/list'); //navigate To Form Page
    }

    return (
        <div className={classes.errorContainer}>
            <div className={classes.textContainer}>
                <h1 className={classes.text1}>404</h1>
                <h2 className={classes.text2}>Oops, something went wrong!</h2>
                <p className={classes.text3}>Sorry, an unexpected error has occurred</p>
                <button className={classes.btn} onClick={buttonClickHandler}>Go to Home Page</button>
            </div>
        </div>
    );
}

export default ErrorPage;