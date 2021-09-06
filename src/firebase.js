import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({

    apiKey: "AIzaSyBiLgyUO-JuFl8tGrYHfdin-3U6orYTtLE",
    authDomain: "web-chat-5e571.firebaseapp.com",
    projectId: "web-chat-5e571",
    storageBucket: "web-chat-5e571.appspot.com",
    messagingSenderId: "766782263230",
    appId: "1:766782263230:web:a7d43c1a4b79f6471e33ef"

}).auth();