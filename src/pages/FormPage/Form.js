import { useLocation } from 'react-router-dom';
import NavBar from "../../components/FormComponents/NavBar/NavBar";
import EventsForm from "../../components/FormComponents/Form/EventsForm";
import classes from './Form.module.css'

function Form() {
    const location = useLocation();

    //JSX CODE---------------------------------------------------------------
    return (
        <div className={classes.mainContainer}>
            <NavBar headerText={location.state.headerText} />
            <EventsForm pageId={location.state.id} buttonText={location.state.buttonText} />
        </div>
    );
}

export default Form;