import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, onValue, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

var firebaseConfig = {
    apiKey: "AIzaSyBZ33dDbUj7p5n8k5aQivuDyPqVx1OU1vQ",
    authDomain: "task1---events-webpage.firebaseapp.com",
    databaseURL: "https://task1---events-webpage-default-rtdb.firebaseio.com",
    projectId: "task1---events-webpage",
    storageBucket: "task1---events-webpage.appspot.com",
    messagingSenderId: "642153429925",
    appId: "1:642153429925:web:24b7fc5f171016582cc64c",
    measurementId: "G-9N01SC4T9N"
};

const app = initializeApp(firebaseConfig); //To initialize Firebase
const db = getDatabase(app);
const newBtn = document.getElementById("new-event-btn");
const searchBar = document.getElementById("searchBar");
const list = document.getElementById("sort-options");

var totalRecord = 0;
loadEvents(); //load the events from database to the webpage


//*****************EVENT LISTENERS*****************/
//NEW+ button functionality
newBtn.addEventListener("click", newEvent);
function newEvent() {
    set(ref(db, 'eventToEdit/'), { //when user clicks new - no events to edit so make sure eventToEdit is set to none 
        id: "none",
        name: "none",
        description: "none",
        date: "none"
    });
    window.location.href = "form.html";
}

//Search bar functionality 
searchBar.onkeyup = () => {
    let searchName = document.getElementById("searchBar").value.toUpperCase();
    let cards = document.getElementsByClassName("card");
    //iterate through all cards and hide cards that don't match the search query
    var i;
    for (i = 0; i < cards.length; i++) {
        let name = cards[i].textContent.toUpperCase(); //or name = cards[i].innerText;
        if (name.indexOf(searchName) > -1) { //check if searchName is substring of card name
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

//Sorting drop-down list functionality
list.onchange = () => {
    clearEvents();
    loadEvents();
}


//*****************FUNCTIONS*****************/
//This function loads all the cards/events and their count in the page and checks for edits
function loadEvents() {
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, 'events/')).then((snapshot) => {
        if (snapshot.exists()) {

            let arr = snapshotToArray(snapshot); //CONVERT FIREBASE DATABASE SNAPSHOT/COLLECTION TO AN ARRAY
            var value = list.value; //date, name
            //console.log("value" + value);
            if (value == "date") { //sort by date
                arr.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date); //convert date strings to date objects and then subtract them
                });
            }
            else { //sort by name
                arr.sort(function (a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
            }
            console.log("Array after sorting: ");
            console.log(arr);

            let i = 0;
            while (i < arr.length) { //load the cards
                var name = arr[i].name;
                //name = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();//convert to title case
                var description = arr[i].description;
                var date = arr[i].date;
                console.log(name);
                console.log(description);
                console.log(date);
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
                i++;
            }

            //load the count value and write it on the page
            totalRecord = arr.length;
            console.log("Total Record : " + totalRecord);
            document.getElementById("count-label").innerHTML = "Count: " + totalRecord;

            setTimeout(function () {
                //check for edits
                const allCardsArray = document.getElementsByClassName("card");
                for (var i = 0; i < allCardsArray.length; i++) {
                    let card = allCardsArray[i];
                    card.addEventListener('click', function () {
                        let cardName = card.childNodes[0].nodeValue;
                        let cardDescription = card.childNodes[2].nodeValue;
                        let cardDate = card.childNodes[4].nodeValue;
                        //console.log(cardName);console.log(cardDate);
                        const c = arr.find(item => item.name == cardName);
                        //console.log(c);
                        //console.log(c.key);
                        set(ref(db, 'eventToEdit/'),
                            {
                                id: c.key,
                                name: cardName,
                                description: cardDescription,
                                date: cardDate
                            });
                        window.location.href = 'form.html';
                    });
                }
            }, 2000);


        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

//This function deletes all the card events in the page
function clearEvents() {
    var allCards = document.querySelectorAll('.card');
    allCards.forEach(c => {
        c.remove();
    });
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
function compareDates(divDate) {
    const currDate = new Date();
    //console.log("Today date"+currDate.toLocaleDateString());
    //console.log("div date"+divDate);

    //current date format : 8/19/2023
    let currDay = currDate.getDate();
    let currMonth = currDate.getMonth() + 1;
    let currYear = currDate.getFullYear();

    //div date format : 2023-08-31T14:40   -  type="datetime-local" 
    var divDay = divDate.substring(8, 10);
    var divMonth = divDate.substring(5, 7);
    var divYear = divDate.substring(0, 4);

    if (divYear > currYear || (divYear == currYear && divMonth > currMonth) || (divYear == currYear && divMonth == currMonth && divDay > currDay)) {
        return 1;
    }
    else if (divYear == currYear && divMonth == currMonth && divDay == currDay) {
        return 0;
    }
    else {
        return -1;
    }

}