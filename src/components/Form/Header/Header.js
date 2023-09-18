import React from 'react';
import PropTypes from 'prop-types'; // ES6
import classes from './Header.module.css';

const Header = (props) => {

    var PropTypes = require('prop-types'); // ES5 with npm

    return (
        <div className={classes.headerDiv}>
            <h1> {props.headerText} </h1>
        </div>
    );
}

Header.propTypes = {
    headerText: PropTypes.string,
}

Header.defaultProps = {
    headerText: 'Create event',     //by default - add new event
}

export default Header;