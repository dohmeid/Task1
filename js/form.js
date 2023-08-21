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

const app = initializeApp(firebaseConfig); //To Initialize Firebase
const db = getDatabase(app);
const submitBtn = document.getElementById("submit-form-btn");
const cancelBtn = document.getElementById("cancel-form-btn");
submitBtn.disabled = true;
loadPage();

//*****************EVENT LISTENERS*****************/
//CANCEL button functionality
cancelBtn.addEventListener("click", cancelEvent);
function cancelEvent() {
    set(ref(db, 'eventToEdit/'), { //when user clicks cancel - no events to edit so make sure eventToEdit is set to none 
        id: "none",
        name: "none",
        description: "none",
        date: "none"
    });
    window.location.href = "list.html";
}
document.getElementById("event-name").addEventListener("keyup", validateForm);
document.getElementById("event-date").addEventListener("change", validateForm);
document.getElementById("event-description").addEventListener("keyup", validateForm);

//*****************FUNCTIONS*****************/
//Here, check if the page is to add a new event or edit an event and based on that load event listeners
function loadPage() {
    get(child(ref(db), 'eventToEdit/')).then((snapshot) => {
        if (snapshot.exists()) {
            let name = `${snapshot.val().name}`;
            let description = `${snapshot.val().description}`;
            let date = `${snapshot.val().date}`;
            let id = `${snapshot.val().id}`;

            if (name == "none") {   //To add a new event
                document.getElementById("heading1").innerHTML = "Create Event";
                document.getElementById("submit-form-btn").value = "Add";
                submitBtn.addEventListener("click", (event) => {
                    event.preventDefault();
                    let eventName = document.getElementById("event-name").value;
                    let eventDescription = document.getElementById("event-description").value;
                    let eventDate = document.getElementById("event-date").value;
                    let eventID = eventName + Math.floor((Math.random() * 9999) + 1);
                    eventName = eventName.charAt(0).toUpperCase() + eventName.substr(1).toLowerCase();//convert to title case
                    set(ref(db, 'events/' + eventID),
                        {
                            id: eventID,
                            name: eventName,
                            description: eventDescription,
                            date: eventDate
                        });
                    window.location.href = "list.html";
                });
            }
            else {   //To edit an event
                document.getElementById("heading1").innerHTML = "Edit Event";
                document.getElementById("submit-form-btn").value = "Save";
                document.getElementById("event-name").value = name;
                document.getElementById("event-description").value = description;
                document.getElementById("event-date").value = date;
                submitBtn.addEventListener("click", (event) => {
                    event.preventDefault();
                    let newName = document.getElementById("event-name").value;
                    let newDescription = document.getElementById("event-description").value;
                    let newDate = document.getElementById("event-date").value;
                    newName = newName.charAt(0).toUpperCase() + newName.substr(1).toLowerCase();//convert to title case
                    set(ref(db, 'events/' + id),
                        {
                            id: id,
                            name: newName,
                            description: newDescription,
                            date: newDate
                        });
                    set(ref(db, 'eventToEdit/'),
                        {
                            id: "none",
                            name: "none",
                            description: "none",
                            date: "none"
                        });
                    window.location.href = "list.html";
                });
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

//This function is used to validate form inputs
function validateForm() {
    console.log("i am in validation");
    let name = document.getElementById("event-name").value;
    let date = document.getElementById("event-date").value;
    if (name && date) {
        if (name == null || name == "" || name == " ") { //|| name.trim()==""
            //alert("Name can't be blank");
            submitBtn.disabled = true;
            return false;
        }
        else if (name.length < 3) {
            //alert("Name must be at least 3 characters");
            submitBtn.disabled = true;
            return false;
        }
        else {
            //alert('Valid name given.');
            submitBtn.disabled = false;
            return true;
        }
    }
    else {
        //alert('Empty name or date given.');
        submitBtn.disabled = true;
        return false;
    }
}