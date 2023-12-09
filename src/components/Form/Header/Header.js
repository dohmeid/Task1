import React from 'react';
import PropTypes from 'prop-types'; // ES6
import classes from './Header.module.css';

const Header = (props) => {

    let headerText = "Create Event";
    if (!props.isNew) {
        headerText = "Edit Event";
    }

    return (
        <div className={classes.headerDiv}>
            <h1> {headerText} </h1>
        </div>
    );
}

Header.propTypes = {
    isNew: PropTypes.bool,
}

Header.defaultProps = {
    isNew: true,     //by default - add new event
}

export default Header;