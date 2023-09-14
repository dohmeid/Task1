import { db, ref, set, get, child } from "../../../../services/Firebase";
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import FormFooter from "../FormFooter/FormFooter";
import classes from './FormBody.module.css';


function FormBody(props) {

    //STATES & HOOKS-------------------------------------------------------------------
    const [formValidity, setFormValidity] = useState(false);
    const [formName, setFormName] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formDate, setFormDate] = useState("");
    const [formId, setFormId] = useState("");

    const nameRef = useRef(); //references
    const descriptionRef = useRef();
    const dateRef = useRef();

    const navigate = useNavigate();
    const locationId = props.pageId;

    useEffect(() => {
        if (locationId === 2) {
            loadData();
        }
    }, [locationId]);

    //FUNCTIONS-----------------------------------------------------------------
    const cancelButtonClickHandler = () => {
        set(ref(db, 'eventToEdit/'),
            {
                id: "",
                name: "",
                description: "",
                date: ""
            });
        navigate('/'); //navigate to List Page
    }

    const submitButtonClickHandler = () => {
        let name = nameRef.current.value;
        let description = descriptionRef.current.value;
        let date = dateRef.current.value;
        let eventID = "";
        name = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();//convert to title case

        if (locationId === 1) { //incase of adding a new event// generate a new key
            eventID = name + Math.floor((Math.random() * 9999) + 1); //create a new id for the new event
        }
        else if (locationId === 2) {
            eventID = formId;
        }

        set(ref(db, 'events/' + eventID),
            {
                id: eventID,
                name: name,
                description: description,
                date: date
            });
        set(ref(db, 'eventToEdit/'),
            {
                id: "",
                name: "",
                description: "",
                date: ""
            });

        navigate('/'); //navigate to List Page
    }

    //To load the data form the database in case of editing an event
    const loadData = () => {
        get(child(ref(db), 'eventToEdit/')).then((snapshot) => {
            if (snapshot.exists()) {
                setFormId(`${snapshot.val().id}`);
                setFormName(`${snapshot.val().name}`);
                setFormDescription(`${snapshot.val().description}`);
                setFormDate(`${snapshot.val().date}`);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    //This function is used to validate form inputs (name and date) to disable/enable the submit button
    function validateFormInputs() {
        let name_entered = nameRef.current.value;
        let date_entered = dateRef.current.value;
        let validity = (date_entered === null || date_entered === "" ||
            name_entered === null || name_entered === "" || name_entered.trim() === "" || name_entered.length < 3);
        setFormValidity(!validity);
    };


    //JSX CODE---------------------------------------------------------------
    return (
        <form className={classes.formContainer}>

            <ul className={classes.eventForm}>

                <li className={classes.formRow}>
                    <label htmlFor="event-name">Name:</label>
                    <input ref={nameRef} type="text" id="event-name" name="event-name" placeholder="Enter event name"
                        minLength="3" required
                        onKeyUp={() => validateFormInputs()}
                        defaultValue={formName}
                    /><br />
                </li>

                <li className={classes.formRow}>
                    <label htmlFor="event-description">Description:</label>
                    <textarea ref={descriptionRef} rows="8" id="event-description" name="event-description" placeholder="This field is optional"
                        onKeyUp={() => validateFormInputs()}
                        defaultValue={formDescription}  ></textarea><br />
                </li>

                <li className={classes.formRow}>
                    <label htmlFor="event-date">Date:</label>
                    <input ref={dateRef} type="datetime-local" id="event-date" name="event-date" placeholder="Enter event date"
                        required
                        onChange={() => validateFormInputs()}
                        defaultValue={formDate} /><br />
                </li>

            </ul>

            <FormFooter
                formValidity={formValidity}
                buttonText={props.buttonText}
                cancelButtonClickHandler={cancelButtonClickHandler}
                submitButtonClickHandler={submitButtonClickHandler}
            />

        </form>
    );
}

export default FormBody;