import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAJ8JCGn2mbat962ezST_QCWMJYl40UZ50",
    authDomain: "aixplore-8c3da.firebaseapp.com",
    databaseURL: "https://aixplore-8c3da-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "aixplore-8c3da",
    storageBucket: "aixplore-8c3da.appspot.com",
    messagingSenderId: "316462774028",
    appId: "1:316462774028:web:8879e462ee9d9b3f717b29",
    measurementId: "G-0B3G44YKLE"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
