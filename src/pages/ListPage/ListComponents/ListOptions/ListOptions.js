import React, { useRef } from 'react';
import PropTypes from 'prop-types'; // ES6
import classes from './ListOptions.module.css';

const ListOptions = (props) => {

    //STATES & HOOKS------------------------------------------------------------------
    const name = useRef();
    const sortOption = useRef();
    var PropTypes = require('prop-types'); // ES5 with npm

    //FUNCTIONS----------------------------------------------------------------
    //Search bar functionality: displays only events that match the search query
    const search = () => {
        let searchName = name.current.value;
        searchName = searchName.charAt(0).toUpperCase() + searchName.substr(1).toLowerCase();//convert to title case

        //iterate through all cards and add only cards that match the search query to the searchResultCards array
        let searchResultCards = [];
        for (let cardData of props.originalDataArray) {
            let name = cardData.name;
            if (name.indexOf(searchName) > -1) { //check if searchName is a substring of card name
                searchResultCards.push(cardData); //add to filteredArray
            }
        }

        props.setFilteredDataArray(searchResultCards);
        props.setTotalCards(searchResultCards.length);
        sortCards();
    }

    //Sort cards functionality: sorts the cards based on the user's  (date or name)
    const sortCards = () => {
        let sortOptionValue = sortOption.current.value; //date, name
        let filteredArray = props.filteredDataArray;

        if (sortOptionValue === "date") { //sort by date
            filteredArray.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date); //convert date strings to date objects and then subtract them
            });
        }
        else if (sortOptionValue === "name") { //sort by name
            filteredArray.sort(function (a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }

        props.setFilteredDataArray(filteredArray);
        props.setChange(true);
    }


    //JSX CODE---------------------------------------------------------------
    return (
        <div className={classes.searchbarSortlistDiv}>

            <input type="text" placeholder="Search" className={classes.searchbar} onKeyUp={() => search()}
                ref={name} />

            <div className={classes.options}>
                <label htmlFor="sort-options" className={classes.sortOptionsLabel}>Sort by</label>
                <select name="sort-options" className={classes.sortOptions} onChange={() => sortCards()}
                    ref={sortOption} defaultValue="none">
                    <option value="none" disabled hidden>Select...</option>
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                </select>
            </div>

        </div>
    );
}

ListOptions.propTypes = {
    filteredDataArray: PropTypes.array,
    originalDataArray: PropTypes.array,
}

export default ListOptions;