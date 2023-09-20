import { db, app, getDatabase, ref, set, get, child } from "../../services/Firebase/Firebase";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { snapshotToArray, compareDates } from '../../services/Utility/Utils';
import Header from './Header/Header';
import ControlBar from './ControlBar/ControlBar';
import Body from './Body/Body';
import Footer from './Footer/Footer';
import classes from './List.module.css';


const List = () => {

    //STATES & HOOKS------------------------------------------------------------------
    const [originalDataArray, setOriginalDataArray] = useState([]); //this array contains filtered group of data from the originalArray
    const [filteredDataArray, setFilteredDataArray] = useState([]); //this array contains filtered group of data from the originalArray
    const [totalCards, setTotalCards] = useState(0); //contains the total number of events' cards
    const navigate = useNavigate();

    useEffect(() => {
        loadEvents(); //Initially load all the events from the database
    }, []);

    //FUNCTIONS-----------------------------------------------------------------
    const newButtonClickHandler = () => {
        set(ref(db, 'eventToEdit/'), { //when user clicks new - no events to edit so make sure eventToEdit is set to "" empty string 
            id: "",
            name: "",
            description: "",
            date: ""
        });
        navigate('/form'); //navigate To Form Page - add new event
    }

    //This function loads all the cards/events and their count from the database to the page and checks for edits
    const loadEvents = () => {
        const dbRef = ref(getDatabase(app));
        get(child(dbRef, 'events/')).then((snapshot) => {
            if (snapshot.exists()) {
                let originalData = [];
                originalData = snapshotToArray(snapshot); //CONVERT FIREBASE DATABASE SNAPSHOT/COLLECTION TO AN ARRAY
                for (let i = 0; i < originalData.length; i++) {
                    if (compareDates(originalData[i].date) === 1)
                        originalData[i].color = "#982176"; //purple
                    else if (compareDates(originalData[i].date) === 0)
                        originalData[i].color = "#1434A4"; //blue
                    else if (compareDates(originalData[i].date) === -1)
                        originalData[i].color = "#D22B2B"; //red
                }
                setOriginalDataArray(originalData);
                setFilteredDataArray(originalData);
                setTotalCards(originalData.length);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    //This function is used when clicking a div to edit it's event
    const divClickHandler = (event) => {
        let divData = event.currentTarget.textContent;
        let myArray = divData.trim().split("  ");
        let name = myArray[0].toUpperCase();
        let cardData = filteredDataArray.find((cardData) => cardData.name.toUpperCase() === name);
        set(ref(db, 'eventToEdit/'),
            {
                id: cardData.id,
                name: cardData.name,
                description: cardData.description,
                date: cardData.date
            });
        navigate('/form/edit'); //navigate To Form Page - edit an event
    }


    //JSX CODE---------------------------------------------------------------
    return (
        <div className={classes.mainContainer}>
            <Header newButtonClickHandler={() => { newButtonClickHandler() }} />

            <ControlBar
                filteredDataArray={filteredDataArray}
                setFilteredDataArray={setFilteredDataArray}
                originalDataArray={originalDataArray}
                setTotalCards={setTotalCards}
            />

            <Body
                filteredDataArray={filteredDataArray}
                divClickHandler={divClickHandler}
            />

            <Footer count={totalCards} />
        </div>
    );
}

export default List;