import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
export { getDatabase, ref, set, get, child };

export var firebaseConfig = {
    apiKey: "AIzaSyAIl6-E84DOr-9uhOZxodVy2namV9oRqlg",
    authDomain: "eventswebpage---reactapp.firebaseapp.com",
    databaseURL: "https://eventswebpage---reactapp-default-rtdb.firebaseio.com",
    projectId: "eventswebpage---reactapp",
    storageBucket: "eventswebpage---reactapp.appspot.com",
    messagingSenderId: "181665488560",
    appId: "1:181665488560:web:f1a00fd62a91e64b8b2575"
};

export const app = initializeApp(firebaseConfig); //To Initialize Firebase
export const db = getDatabase(app);