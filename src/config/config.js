import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDmIu0X5eD1KlGQ3IgoO5zHQQBtx3d5-8c",
    authDomain: "queue-aps.firebaseapp.com",
    databaseURL: "https://queue-aps.firebaseio.com",
    projectId: "queue-aps",
    storageBucket: "queue-aps.appspot.com",
    messagingSenderId: "672559411239",
    appId: "1:672559411239:web:c4e95abd64117a7683de02",
    measurementId: "G-CXWSH9ZBP5"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
