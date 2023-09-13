import classes from './ListOptions.module.css';
import { useState, useRef, useEffect } from 'react';

function ListOptions(props) {

    //STATES & HOOKS------------------------------------------------------------------
    const name = useRef();
    const sortOption = useRef();

    /*
      filteredDataArray={filteredDataArray}
      setFilteredDataArray={setFilteredDataArray}
    originalData
    */

    //FUNCTIONS----------------------------------------------------------------
    //Search bar functionality: displays only events that match the search query
    function search() {
        let searchName = name.current.value;
        console.log(searchName);

        //iterate through all cards and add only cards that match the search query to the searchResultCards array
        let searchResultCards = [];
        for (let cardData of props.originalData) {
            let name1 = cardData.name;
            if (name1.indexOf(searchName) > -1) { //check if searchName is a substring of card name
                searchResultCards.push(cardData); //add to filteredArray
            }
        }

        console.log(props.originalData.length);
        console.log(searchResultCards.length);
        props.setFilteredDataArray(searchResultCards);
        props.setTotalCards(searchResultCards.length)
    }

    //Sort cards functionality: sorts the cards based on the user's  (date or name)
    function sortCards() {

        let sortOptionValue = sortOption.current.value; //date, name
        let filteredArray = props.filteredDataArray;

        if (sortOptionValue == "date") { //sort by date
            filteredArray.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date); //convert date strings to date objects and then subtract them
            });
        }
        else if (sortOptionValue == "name") { //sort by name
            filteredArray.sort(function (a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }

        props.setFilteredDataArray(filteredArray);
    }



    //JSX CODE---------------------------------------------------------------
    return (
        <div className={classes.searchbarSortlistDiv}>

            <input type="text" placeholder="Search" className={classes.searchbar} onKeyUp={() => search()}
                ref={name} />

            <div className={classes.options}>
                <label htmlFor="sort-options" className={classes.sortOptionsLabel}>Sort by</label>
                <select name="sort-options" className={classes.sortOptions} onChange={() => sortCards()} ref={sortOption}>
                    <option value="none" disabled hidden>Select...</option>
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                </select>
            </div>

        </div>
    );
}

export default ListOptions;