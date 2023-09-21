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
                {props.filteredDataArray.map((item) =>
                    <div className={classes.card} style={{ backgroundColor: item.color }}
                        key={item.id} onClick={props.cardClickHandler}>
                        <p> {item.name} </p>
                        <p> {item.description} </p>
                        <p> {item.date} </p>
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