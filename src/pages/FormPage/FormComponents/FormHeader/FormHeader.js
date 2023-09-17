import React from 'react';
import PropTypes from 'prop-types'; // ES6
import classes from './FormHeader.module.css';

const FormHeader = (props) => {

    var PropTypes = require('prop-types'); // ES5 with npm

    return (
        <div className={classes.headerDiv}>
            <h1> {props.headerText} </h1>
        </div>
    );
}

FormHeader.propTypes = {
    headerText: PropTypes.string,
}

export default FormHeader;