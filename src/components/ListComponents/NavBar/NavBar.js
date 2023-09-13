import classes from './NavBar.module.css';

function NavBar(props) {

    //JSX CODE---------------------------------------------------------------
    return (
        <header>
            <h1>Events</h1>
            <button className={classes.newButton} type="button" onClick={props.newButtonClickHandler}>+New</button>
        </header>
    );
}

export default NavBar;