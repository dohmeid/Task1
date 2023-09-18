import React from 'react';
import PropTypes from 'prop-types'; // ES6
import classes from './Body.module.css';

const Body = (props) => {

    var PropTypes = require('prop-types'); // ES5 with npm

    return (
        <div className={classes.resultsSection}>

            <div className={classes.header}>
                <h2 className={classes.text}>Results</h2>
            </div>

            <div className={classes.content}>
                {Array(props.totalCards).fill().map((row, i) =>
                    <div className={classes.card} style={{ backgroundColor: props.color[i] }}
                        key={i} onClick={props.divClickHandler}>
                        <p> {props.filteredDataArray[i].name} </p>
                        <p> {props.filteredDataArray[i].description} </p>
                        <p> {props.filteredDataArray[i].date} </p>
                    </div>
                )}
            </div>

        </div>
    );
}

Body.propTypes = {
    totalCards: PropTypes.number,
    color: PropTypes.array.isRequired,
    filteredDataArray: PropTypes.array.isRequired,
}

Body.defaultProps = {
    totalCards: 0,
}

export default Body;