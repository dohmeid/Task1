import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './ControlBar.module.css';

const ControlBar = (props) => {

    //STATES & HOOKS------------------------------------------------------------------
    const [sortOption, setSortOption] = useState("none");
    const [isChanged, setIsChanged] = useState(false); //to re-sort the cards in the search case  

    useEffect(() => {
        sortCards();
        setIsChanged(false);
    }, [sortOption, isChanged]);


    //FUNCTIONS----------------------------------------------------------------
    //Search bar functionality: displays only events that match the search query
    const searchNameChangeHandler = (e) => {
        let searchName = e.target.value;
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
        setIsChanged(true);
    }

    //Sort cards functionality: sorts the cards based on the user's  (date or name)
    const sortCards = () => {
        let sortedArray = [...props.filteredDataArray];
        if (sortOption === "date") { //sort by date
            sortedArray.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date); //convert date strings to date objects and then subtract them
            });
        }
        else if (sortOption === "name") { //sort by name
            sortedArray.sort(function (a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }
        props.setFilteredDataArray(sortedArray);
    }

    const sortChangeHandler = (e) => {
        setSortOption(e.target.value);
    }


    //JSX CODE---------------------------------------------------------------
    return (
        <div className={classes.searchbarSortlistDiv}>

            <input type="text" placeholder="Search" className={classes.searchbar}
                onChange={searchNameChangeHandler} />

            <div className={classes.options}>
                <label htmlFor="sort-options" className={classes.sortOptionsLabel}>Sort by</label>
                <select name="sort-options" className={classes.sortOptions} value={sortOption}
                    onChange={sortChangeHandler}>
                    <option value="none" disabled hidden>Select...</option>
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                </select>
            </div>

        </div>
    );
}

ControlBar.propTypes = {
    filteredDataArray: PropTypes.array.isRequired,
    originalDataArray: PropTypes.array.isRequired,
}

export default ControlBar;