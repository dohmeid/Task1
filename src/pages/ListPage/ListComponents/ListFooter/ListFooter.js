import React from 'react';
import classes from './ListFooter.module.css';

function ListFooter(props) {

    //JSX CODE---------------------------------------------------------------
    return (
        <footer className={classes.footer}>
            <hr />
            <p className={classes.text}>Count: {props.count}</p>
        </footer>
    );
}

export default ListFooter;