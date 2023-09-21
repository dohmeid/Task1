import React from 'react';
import PropTypes from 'prop-types';
import Header from "./Header/Header";
import Body from "./Body/Body";
import classes from './Form.module.css'

const Form = (props) => {

    //JSX CODE---------------------------------------------------------------
    return (
        <div className={classes.mainContainer}>
            <Header isNew={props.isNew} />
            <Body isNew={props.isNew} />
        </div>
    );
}

Form.propTypes = {
    isNew: PropTypes.bool,
}

Form.defaultProps = {
    isNew: true,
}

export default Form;