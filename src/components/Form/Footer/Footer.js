import React from 'react';
import PropTypes from 'prop-types'; 
import classes from './Footer.module.css'

const Footer = (props) => {

    let buttonText = "Add";
    if (!props.isNew) {
        buttonText = "Save";
    }

    return (
        <footer className={classes.footerDiv}>
            <hr />
            <div className={classes.buttons}>
                <button type="button" id="cancel-button" onClick={props.cancelButtonClickHandler}>Cancel</button>
                <input type="submit" id="submit-button" value={buttonText} disabled={!props.formValidity} />
            </div>
        </footer>
    );
}

Footer.propTypes = {
    formValidity: PropTypes.bool.isRequired,
    isNew: PropTypes.bool,
}

Footer.defaultProps = {
    isNew: true,
}

export default Footer;