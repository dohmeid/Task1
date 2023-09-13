import classes from './Footer.module.css'

function Footer(props) {

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

export default Footer;