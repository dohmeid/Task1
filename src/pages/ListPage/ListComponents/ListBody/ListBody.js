import React from 'react';
import classes from './ListBody.module.css';

function ListBody(props) {

    //JSX CODE---------------------------------------------------------------
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

export default ListBody;