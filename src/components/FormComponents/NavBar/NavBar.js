import classes from './NavBar.module.css';

function NavBar(props) {
    return (
        <div className={classes.headerDiv}>
            <h1> {props.headerText} </h1>
        </div>
    );
}

export default NavBar;