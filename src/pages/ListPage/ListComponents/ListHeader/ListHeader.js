import React from 'react';
import classes from './ListHeader.module.css';

function ListHeader(props) {

    return (
        <header className={classes.header}>
            <h1 className={classes.text}>Events</h1>
            <button className={classes.newButton} type="button" onClick={props.newButtonClickHandler}>+New</button>
        </header>
    );
}

export default ListHeader;