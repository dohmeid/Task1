import React from 'react';
import PropTypes from 'prop-types';
import classes from './Body.module.css';

const Body = (props) => {

    return (
        <div className={classes.resultsSection}>

            <div className={classes.header}>
                <h2 className={classes.text}>Results</h2>
            </div>

            <div className={classes.content}>
                {Array(props.filteredDataArray.length).fill().map((row, i) =>
                    <div className={classes.card} style={{ backgroundColor: props.filteredDataArray[i].color }}
                        key={props.filteredDataArray[i].id} onClick={props.divClickHandler}>
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
    filteredDataArray: PropTypes.array.isRequired,
}

export default Body;