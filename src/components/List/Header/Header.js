import React from 'react';
import classes from './Header.module.css';

const Header = (props) => {

    return (
        <header className={classes.header}>
            <h1 className={classes.text}>Events</h1>
            <button className={classes.newButton} type="button" onClick={props.newButtonClickHandler}>+New</button>
        </header>
    );
}

export default Header;