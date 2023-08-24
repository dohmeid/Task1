import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
export { getDatabase, ref, set, get, child };

export var firebaseConfig = {
    apiKey: "AIzaSyBZ33dDbUj7p5n8k5aQivuDyPqVx1OU1vQ",
    authDomain: "task1---events-webpage.firebaseapp.com",
    databaseURL: "https://task1---events-webpage-default-rtdb.firebaseio.com",
    projectId: "task1---events-webpage",
    storageBucket: "task1---events-webpage.appspot.com",
    messagingSenderId: "642153429925",
    appId: "1:642153429925:web:24b7fc5f171016582cc64c",
    measurementId: "G-9N01SC4T9N"
};

export const app = initializeApp(firebaseConfig); //To Initialize Firebase
export const db = getDatabase(app);