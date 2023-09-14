import React from 'react';
import classes from './FormFooter.module.css'

function FormFooter(props) {

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

export default FormFooter;