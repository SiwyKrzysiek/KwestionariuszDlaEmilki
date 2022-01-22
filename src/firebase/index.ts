import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqJdb77Jn6iTUh59kguKcYXr8pQxXn9IE",
  authDomain: "kwestionariusz-dla-emilki.firebaseapp.com",
  projectId: "kwestionariusz-dla-emilki",
  storageBucket: "kwestionariusz-dla-emilki.appspot.com",
  messagingSenderId: "606995446451",
  appId: "1:606995446451:web:51b26cd4dcc96ec8b40ec6"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore();

// Collections
export const toCreateCollection = collection(firestore, "toCreate");
export const pendingCollection = collection(firestore, "pending");
export const responsesCollection = collection(firestore, "responses");
export const templatesCollection = collection(firestore, "templates");
