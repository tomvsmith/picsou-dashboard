import * as firebase from "firebase/app";
import "firebase/auth";

export const firebaseAuthClientID = '360932669439-0va9nbd861ttb9sju51poph48vbi6130.apps.googleusercontent.com';

export const createFirebaseApp = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyAVIyoVGl7IhtI0G8QwIXSGdjFzsvn4cXw",
        authDomain: "picsou-dashboard.firebaseapp.com",
        databaseURL: "https://picsou-dashboard.firebaseio.com",
        projectId: "picsou-dashboard",
        storageBucket: "picsou-dashboard.appspot.com",
        messagingSenderId: "360932669439",
        appId: "1:360932669439:web:5b9417189c8efcf9ac59ca",
        measurementId: "G-YC1FD409ZH"
    };

    return firebase.initializeApp(firebaseConfig);
};