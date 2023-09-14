import { db, app, getDatabase, ref, set, get, child } from "../../services/Firebase";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ListHeader from './ListComponents/ListHeader/ListHeader';
import ListOptions from './ListComponents/ListOptions/ListOptions';
import ListBody from './ListComponents/ListBody/ListBody';
import ListFooter from './ListComponents/ListFooter/ListFooter';
import classes from './ListPage.module.css';


function ListPage() {

    //STATES & HOOKS------------------------------------------------------------------
    const [originalDataArray, setOriginalDataArray] = useState([]); //this array contains filtered group of data from the originalArray
    const [filteredDataArray, setFilteredDataArray] = useState([]); //this array contains filtered group of data from the originalArray
    const [totalCards, setTotalCards] = useState(0); //contains the total number of events' cards
    const [cardsColorsArray, setCardsColorsArray] = useState([]);
    const [change, setChange] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadEvents(); //Initially load all the events from the database
    }, []);

    useEffect(() => {
        if (change === true) {
            displayCards(); //load the events from the database to the originalDataArray
            setChange(false);
        }
    });


    //FUNCTIONS-----------------------------------------------------------------
    const newButtonClickHandler = () => {
        set(ref(db, 'eventToEdit/'), { //when user clicks new - no events to edit so make sure eventToEdit is set to "" empty string 
            id: "",
            name: "",
            description: "",
            date: ""
        });
        navigate('/form', { state: { id: 1, headerText: 'Create Event', buttonText: 'Add' } }); //navigate To Form Page
    }

    //This function loads all the cards/events and their count from the database to the page and checks for edits
    function loadEvents() {
        const dbRef = ref(getDatabase(app));
        get(child(dbRef, 'events/')).then((snapshot) => {
            if (snapshot.exists()) {
                let originalData = [];
                originalData = snapshotToArray(snapshot); //CONVERT FIREBASE DATABASE SNAPSHOT/COLLECTION TO AN ARRAY                displayCards(); //intially display the cards as the order they appear in the database
                setOriginalDataArray(originalData);
                setFilteredDataArray(originalData);
                setTotalCards(originalData.length);
                setChange(true);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    //This function is used to display the data as cards on the screen
    function displayCards() {
        let colorsArray = [];
        //set the colors array such that, Past date:red - Current date:blue - Future date:Purple  
        for (let i = 0; i < filteredDataArray.length; i++) {
            if (compareDates(filteredDataArray[i].date) === 1)
                colorsArray[i] = "#982176"; //purple
            else if (compareDates(filteredDataArray[i].date) === 0)
                colorsArray[i] = "#1434A4"; //blue
            else if (compareDates(filteredDataArray[i].date) === -1)
                colorsArray[i] = "#D22B2B"; //red
        }
        setCardsColorsArray(colorsArray);
    }

    //This function is used when clicking a div to edit it's event
    const divClickHandler = (event) => {
        let divData = event.currentTarget.textContent;
        var myArray = divData.trim().split("  ");
        var name = myArray[0].toUpperCase();

        for (let k = 0; k < filteredDataArray.length; k++) {
            console.log(filteredDataArray[k].name);
            if (name === filteredDataArray[k].name.toUpperCase()) {
                console.log("good here" + filteredDataArray[k].name);
                set(ref(db, 'eventToEdit/'),
                    {
                        id: filteredDataArray[k].id,
                        name: filteredDataArray[k].name,
                        description: filteredDataArray[k].description,
                        date: filteredDataArray[k].date
                    });
                break;
            }
        }
        navigate('/form', { state: { id: 2, headerText: 'Edit Event', buttonText: 'Save' } }); //navigate To Form Page
    }

    //This function converts firebase snapshot to array
    function snapshotToArray(snapshot) {
        var returnArr = [];
        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    }

    //This function compares one date with the current date and returns 1 if it's a future date, 0 the current date, -1 a past date
    function compareDates(divDate2) {
        let currDate = new Date(); //current date format : 8/19/2023
        let divDate = new Date(divDate2); //convert div date format from 2023-08-31T14:40   -  type="datetime-local" to date object format

        let currDay = currDate.getDate();
        let currMonth = currDate.getMonth() + 1;
        let currYear = currDate.getFullYear();

        let divDay = divDate.getDate();
        let divMonth = divDate.getMonth() + 1;
        let divYear = divDate.getFullYear();

        if (divYear > currYear || (divYear === currYear && divMonth > currMonth) || (divYear === currYear && divMonth === currMonth && divDay > currDay)) {
            return 1;
        }
        else if (divYear === currYear && divMonth === currMonth && divDay === currDay) {
            return 0;
        }
        else {
            return -1;
        }
    }


    //JSX CODE---------------------------------------------------------------
    return (
        <div className={classes.mainContainer}>
            <ListHeader newButtonClickHandler={() => { newButtonClickHandler() }} />

            <ListOptions
                filteredDataArray={filteredDataArray}
                setFilteredDataArray={setFilteredDataArray}
                originalDataArray={originalDataArray}
                setTotalCards={setTotalCards}
                setChange={setChange}
            />

            <ListBody totalCards={totalCards}
                color={cardsColorsArray}
                divClickHandler={divClickHandler}
                filteredDataArray={filteredDataArray}
            />

            <ListFooter count={totalCards} />
        </div>
    );
}

export default ListPage;