import classes from './Footer.module.css';

function Footer(props) {

    //JSX CODE---------------------------------------------------------------
    return (
        <footer>
            <hr />
            <p >Count: {props.count}</p>
        </footer>
    );
}

export default Footer;