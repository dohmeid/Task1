import classes from './Results.module.css';

function Results(props) {

    //STATES & HOOKS------------------------------------------------------------------


    //FUNCTIONS-----------------------------------------------------------------


    //JSX CODE---------------------------------------------------------------
    return (
        <section className={classes.resultsSection}>

            <div className={classes.header}>
                <h2>Results</h2>
            </div>

            <div className={classes.content}>
                {Array(props.totalCards).fill().map((row, i) =>
                    <div className={classes.card} style={{ backgroundColor: props.color[i] }}
                        key={i}
                        onClick={props.divClickHandler}>
                        {props.filteredDataArray[i].name + " " + props.filteredDataArray[i].description + " " + props.filteredDataArray[i].date}
                    </div>
                )}
            </div>

        </section>
    );
}

export default Results;