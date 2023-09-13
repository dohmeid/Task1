import { db, app, getDatabase, ref, set, get, child } from "../../services/firebase";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../../components/ListComponents/NavBar/NavBar';
import Footer from '../../components/ListComponents/Footer/Footer';
import Results from '../../components/ListComponents/Results/Results';
import ListOptions from '../../components/ListComponents/SearchSortDiv/ListOptions';
import classes from './List.module.css';


function List() {

    const [totalCards, setTotalCards] = useState(0);
    const navigate = useNavigate();

    const [filteredDataArray, setFilteredDataArray] = useState([]); //this array contains filtered group of data from the originalArray
    const [originalData, setOriginalData] = useState([]); //this array contains filtered group of data from the originalArray
    const [color, setColor] = useState([]);

    var originalDataArray = []; //this array contains the original data from the firebase database
    var colors = [];

    useEffect(() => {
        loadEvents(); //initially load the events from the database to the originalDataArray
    }, [{ totalCards }]);


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
                originalDataArray = snapshotToArray(snapshot); //CONVERT FIREBASE DATABASE SNAPSHOT/COLLECTION TO AN ARRAY                displayCards(); //intially display the cards as the order they appear in the database
                displayCards();
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    //This function is used to display the data as cards on the screen
    function displayCards() {
        setOriginalData(originalDataArray);
        setFilteredDataArray(originalDataArray);
        setTotalCards(originalDataArray.length);

        //set the colors array such that, Past date:red - Current date:blue - Future date:Purple  
        for (let i = 0; i < filteredDataArray.length; i++) {
            if (compareDates(filteredDataArray[i].date) === 1)
                colors[i] = "#982176"; //purple
            else if (compareDates(filteredDataArray[i].date) === 0)
                colors[i] = "#1434A4"; //blue
            else if (compareDates(filteredDataArray[i].date) === -1)
                colors[i] = "#D22B2B"; //red
        }
        setColor(colors);
    }

    //This function is used when clicking a div to edit it's event
    const divClickHandler = (event) => {
        let divData = event.currentTarget.textContent;
        var myArray = divData.split(' ');
        var name = myArray[0];

        for (let k = 0; k < filteredDataArray.length; k++) {
            if (name === filteredDataArray[k].name) {
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
        <>
            <div className={classes.mainContainer}>
                <NavBar newButtonClickHandler={() => { newButtonClickHandler() }} />

                <ListOptions
                    filteredDataArray={filteredDataArray}
                    setFilteredDataArray={setFilteredDataArray}
                    originalData={originalData}
                    setTotalCards={setTotalCards}
                />

                <Results totalCards={totalCards}
                    color={color}
                    divClickHandler={divClickHandler}
                    filteredDataArray={filteredDataArray}
                />

                <Footer count={totalCards} />
            </div>

        </>
    );
}

export default List;