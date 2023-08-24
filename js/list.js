import { db, app, getDatabase, ref, set, get, child } from "./service.js";

const newBtn = document.getElementById("new-event-btn");
const searchBar = document.getElementById("searchBar");
const sortlist = document.getElementById("sort-options");

var originalArray = []; //this array contains the original data from the firebase database
var filteredArray = []; //this array contains filtered group of data from the originalArray
var totalRecord = 0;

loadEvents(); //load the events from database to the originalArray


//*****************EVENT LISTENERS*****************/
//NEW+ button functionality
newBtn.addEventListener("click", newEvent);
function newEvent() {
    set(ref(db, 'eventToEdit/'), { //when user clicks new - no events to edit so make sure eventToEdit is set to "" empty string 
        id: "",
        name: "",
        description: "",
        date: ""
    });
    window.location.href = "form.html";
}

//Search bar functionality: displays only events that match the search query
searchBar.onkeyup = () => {
    let searchName = document.getElementById("searchBar").value.toUpperCase();
    //iterate through all cards and add only cards that match the search query to the searchResultCards array
    let searchResultCards = [];
    for (let k = 0; k < originalArray.length; k++) {
        let name1 = originalArray[k].name.toUpperCase();
        if (name1.indexOf(searchName) > -1) { //check if searchName is a substring of card name
            searchResultCards.push(originalArray[k]); //add to filteredArray
        }
    }
    filteredArray = [...searchResultCards];
    clearEvents();
    displayCards();
}


//Sorting drop-down list functionality
sortlist.onclick = () => { //it's better to use onClick instead of onChange

    var value = sortlist.value; //date, name

    if (value == "date") { //sort by date
        filteredArray.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date); //convert date strings to date objects and then subtract them
        });
    }
    else if (value == "name") { //sort by name
        filteredArray.sort(function (a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
    clearEvents();
    displayCards();
}


//*****************FUNCTIONS*****************/
//This function loads all the cards/events and their count in the page and checks for edits
function loadEvents() {
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, 'events/')).then((snapshot) => {
        if (snapshot.exists()) {
            originalArray = snapshotToArray(snapshot); //CONVERT FIREBASE DATABASE SNAPSHOT/COLLECTION TO AN ARRAY
            filteredArray = [...originalArray];
            displayCards(); //intially display the cards as the order they appear in the database
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

//This function is used to display the data inside the filteredArray as cards on the screen
function displayCards() {
    for (let i = 0; i < filteredArray.length; i++) { //load the cards
        var name = filteredArray[i].name;
        var description = filteredArray[i].description;
        var date = filteredArray[i].date;

        var newDiv = document.createElement("div");
        var nameTextNode = document.createTextNode(name);
        var lineBreak1 = document.createElement("br");
        var descriptionTextNode = document.createTextNode(description);
        var lineBreak2 = document.createElement("br");
        var dateTextNode = document.createTextNode(date);

        //Past date:red - Current date:blue - Future date:Purple  
        newDiv.setAttribute('class', 'card');
        if (compareDates(date) == 1)
            newDiv.style.backgroundColor = "#982176"; //purple
        else if (compareDates(date) == 0)
            newDiv.style.backgroundColor = "#1434A4"; //blue
        else if (compareDates(date) == -1)
            newDiv.style.backgroundColor = "#D22B2B"; //red

        newDiv.appendChild(nameTextNode);
        newDiv.appendChild(lineBreak1);
        newDiv.appendChild(descriptionTextNode);
        newDiv.appendChild(lineBreak2);
        newDiv.appendChild(dateTextNode);
        document.getElementById("content").appendChild(newDiv);

        newDiv.addEventListener('click', function () {
            set(ref(db, 'eventToEdit/'),
                {
                    id: filteredArray[i].id,
                    name: filteredArray[i].name,
                    description: filteredArray[i].description,
                    date: filteredArray[i].date
                });
            window.location.href = 'form.html';
        });
    }

    //load the count value and write it on the page
    totalRecord = filteredArray.length;
    document.getElementById("count-label").innerHTML = "Count: " + totalRecord;
}

//This function deletes all the card events in the page
function clearEvents() {
    document.getElementById("content").innerHTML = "";
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