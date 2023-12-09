import React from 'react';
import PropTypes from 'prop-types'; 
import classes from './Footer.module.css';

const Footer = (props) => {

    return (
        <footer className={classes.footer}>
            <hr />
            <p className={classes.text}>Count: {props.count}</p>
        </footer>
    );
}

Footer.propTypes = {
    count: PropTypes.number,
}

Footer.defaultProps = {
    count: 0,
}

export default Footer;