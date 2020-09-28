import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCvuIZRNZ3g8Frf-hof40rhwzkII_3owes",
    authDomain: "financebakerz-1.firebaseapp.com",
    databaseURL: "https://financebakerz-1.firebaseio.com",
    projectId: "financebakerz-1",
    storageBucket: "financebakerz-1.appspot.com",
    messagingSenderId: "131703511395",
    appId: "1:131703511395:web:04c19a8f47c2d0d9959b56",
    measurementId: "G-L68ZNF3Z1N"
};

firebase.initializeApp(firebaseConfig);
export default firebase;

// function getCompanies(limit) {
//     return firebase.firestore().collection('Company').orderBy().limit(limit).get();
// }

// export {
//     getCompanies
// }