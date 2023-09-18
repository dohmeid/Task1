import React from 'react';
import PropTypes from 'prop-types'; // ES6
import classes from './Footer.module.css'

const Footer = (props) => {

    var PropTypes = require('prop-types'); // ES5 with npm

    return (
        <footer className={classes.footerDiv}>
            <hr />

            <div className={classes.buttons}>
                <button type="button" onClick={props.cancelButtonClickHandler}>Cancel</button>
                <input type="submit" value={props.buttonText} disabled={!props.formValidity} />
            </div>
        </footer>
    );
}

Footer.propTypes = {
    formValidity: PropTypes.bool.isRequired,
    buttonText: PropTypes.string,
}



export default Footer;