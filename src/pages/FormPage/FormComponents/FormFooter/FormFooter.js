import React from 'react';
import PropTypes from 'prop-types'; // ES6
import classes from './FormFooter.module.css'

function FormFooter(props) {

    var PropTypes = require('prop-types'); // ES5 with npm

    return (
        <footer className={classes.footerDiv}>
            <hr />

            <div className={classes.buttons}>
                <button type="button" onClick={props.cancelButtonClickHandler}>Cancel</button>
                <input type="submit" value={props.buttonText} onClick={props.submitButtonClickHandler} disabled={!props.formValidity} />
            </div>
        </footer>
    );
}

FormFooter.propTypes = {
    formValidity: PropTypes.bool,
    buttonText: PropTypes.string,
}

export default FormFooter;