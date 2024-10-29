// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth , getReactNativePersistence} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
// apiKey: "AIzaSyAWekhiIWOgyxMjokEKE6xqm8K9arlUkyQ",
// authDomain: "cs5520-d7982.firebaseapp.com",
// projectId: "cs5520-d7982",
// storageBucket: "cs5520-d7982.appspot.com",
// messagingSenderId: "727417005641",
// appId: "1:727417005641:web:d46ce982289aec2a048198"

    apiKey: process.env.EXPO_PUBLIC_apiKey,
    authDomain: process.env.EXPO_PUBLIC_authDomain,
    projectId:process.env.EXPO_PUBLIC_projectId,
    storageBucket: process.env.EXPO_PUBLIC_storageBucket,
    messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
    appId: process.env.EXPO_PUBLIC_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});