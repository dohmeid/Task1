import { db, ref, set, get, child } from "./service.js";

const submitBtn = document.getElementById("submit-form-btn");
const cancelBtn = document.getElementById("cancel-form-btn");
const nameField = document.getElementById("event-name");
const descriptionField = document.getElementById("event-description");
const dateField = document.getElementById("event-date");

submitBtn.disabled = true; //by default the submit button is disabled
loadPage();


//*****************EVENT LISTENERS*****************/
//CANCEL button functionality
cancelBtn.addEventListener("click", cancelEvent);
function cancelEvent() {
    set(ref(db, 'eventToEdit/'), { //when user clicks cancel - no events to edit so make sure eventToEdit is set to "" empty string 
        id: "",
        name: "",
        description: "",
        date: ""
    });
    window.location.href = "list.html";
}

//Add event listeners to form input fields to validate the form inputs
nameField.addEventListener("keyup", validateForm);
descriptionField.addEventListener("keyup", validateForm);
dateField.addEventListener("change", validateForm);


//*****************FUNCTIONS*****************/
//Here, check if the page is to add a new event or edit an event and based on that load event listeners
function loadPage() {
    get(child(ref(db), 'eventToEdit/')).then((snapshot) => {
        if (snapshot.exists()) {
            let name = `${snapshot.val().name}`;
            let description = `${snapshot.val().description}`;
            let date = `${snapshot.val().date}`;
            let id = `${snapshot.val().id}`;
            let isNew = true; //initially create event mode

            if (name == "") {   //To add a new event
                document.getElementById("heading1").innerHTML = "Create Event";
                document.getElementById("submit-form-btn").value = "Add";
                isNew = true;  //means create event mode
            }
            else {   //To edit an event
                document.getElementById("heading1").innerHTML = "Edit Event";
                document.getElementById("submit-form-btn").value = "Save";
                document.getElementById("event-name").value = name;
                document.getElementById("event-description").value = description;
                document.getElementById("event-date").value = date;
                isNew = false;  //means edit event mode
            }

            submitBtn.addEventListener("click", (event) => {
                event.preventDefault();
                submitForm(isNew, id);
            });

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

//This function is used to submit the form data to the firebase database
function submitForm(isNew, id) {
    let eventName = document.getElementById("event-name").value;
    let eventDescription = document.getElementById("event-description").value;
    let eventDate = document.getElementById("event-date").value;
    eventName = eventName.charAt(0).toUpperCase() + eventName.substr(1).toLowerCase();//convert to title case

    var eventID = id;
    if (isNew == true) { //create a new event mode
        eventID = eventName + Math.floor((Math.random() * 9999) + 1); //create a new id for the new event
    }
    else { //edit event mode
        set(ref(db, 'eventToEdit/'),
            {
                id: "",
                name: "",
                description: "",
                date: ""
            });
    }
    set(ref(db, 'events/' + eventID),
        {
            id: eventID,
            name: eventName,
            description: eventDescription,
            date: eventDate
        });
    window.location.href = "list.html";
}

//This function is used to validate form inputs (name and date)
function validateForm() {
    let name = document.getElementById("event-name").value;
    let date = document.getElementById("event-date").value;
    //if any of the conditions below are true then the button should be disabled
    submitBtn.disabled = (date === null || date === "" || name === null || name === "" || name.trim() === "" || name.length < 3);
}