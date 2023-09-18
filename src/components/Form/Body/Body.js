import { db, ref, set, get, child } from "../../../services/Firebase";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import React, {useEffect } from 'react';
import PropTypes from 'prop-types'; // ES6
import Footer from "../Footer/Footer";
import classes from './Body.module.css';


const Body = (props) => {

    //STATES & HOOKS-------------------------------------------------------------------
    const { register, handleSubmit, reset, formState: { isValid } } = useForm();

    const navigate = useNavigate();
    const locationId = props.pageId;
    var PropTypes = require('prop-types');

    useEffect(() => {
        if (locationId === 2) {
            loadData();
            //  setFormValidity(true);
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
        navigate('/list'); //navigate to List Page
    }

    const submitButtonClickHandler = (data) => {
        let name = data.name;
        let eventID = "";
        name = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();//convert to title case

        if (locationId === 1) { //incase of adding a new event// generate a new key
            eventID = name + Math.floor((Math.random() * 9999) + 1); //create a new id for the new event
        }
        else if (locationId === 2) {
            eventID = data.id;
        }

        set(ref(db, 'events/' + eventID),
            {
                id: eventID,
                ...data,
                name,
            });
        set(ref(db, 'eventToEdit/'),
            {
                id: "",
                name: "",
                description: "",
                date: ""
            });

        navigate('/list'); //navigate to List Page
    }

    //To load the data form the database in case of editing an event
    const loadData = () => {
        get(child(ref(db), 'eventToEdit/')).then((snapshot) => {
            if (snapshot.exists()) {
                reset({...snapshot.val()})
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    console.log('render');

    //JSX CODE---------------------------------------------------------------
    return (
        <form className={classes.formContainer} onSubmit={handleSubmit(submitButtonClickHandler)}>

            <ul className={classes.eventForm}>

                <li className={classes.formRow}>
                    <label htmlFor="event-name">Name:</label>
                    <input type="text" id="event-name" name="event-name" placeholder="Enter event name"
                        {...register("name", {
                            required: true,
                            minLength: 3
                        })}
                    /><br />
                </li>

                <li className={classes.formRow}>
                    <label htmlFor="event-description">Description:</label>
                    <textarea rows="8" id="event-description" name="event-description" placeholder="This field is optional"
                        {...register("description")}
                    ></textarea><br />
                </li>

                <li className={classes.formRow}>
                    <label htmlFor="event-date">Date:</label>
                    <input type="datetime-local" id="event-date" name="event-date" placeholder="Enter event date"
                        {...register("date", {
                            required: true
                        })}
                    /><br />
                </li>

            </ul>

            <Footer
                formValidity={isValid}
                buttonText={props.buttonText}
                cancelButtonClickHandler={cancelButtonClickHandler}
            />

        </form>
    );
}

Body.propTypes = {
    pageId: PropTypes.number.isRequired,
    buttonText: PropTypes.string,
}

export default Body;