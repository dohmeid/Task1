import React from 'react';
import PropTypes from 'prop-types'; // ES6
import classes from './ListFooter.module.css';

function ListFooter(props) {
    var PropTypes = require('prop-types'); // ES5 with npm

    return (
        <footer className={classes.footer}>
            <hr />
            <p className={classes.text}>Count: {props.count}</p>
        </footer>
    );
}

ListFooter.propTypes = {
    count: PropTypes.number,
}

export default ListFooter;