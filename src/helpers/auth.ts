// Import the functions you need from the SDKs you need
import { getAuth } from "firebase-admin/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAw4nzxiqSZGYg6D6XTAvAl2IFnwp84--I",
  authDomain: "react-getting-started-2a850.firebaseapp.com",
  databaseURL:
    "https://react-getting-started-2a850-default-rtdb.firebaseio.com",
  projectId: "react-getting-started-2a850",
  storageBucket: "react-getting-started-2a850.appspot.com",
  messagingSenderId: "166068049854",
  appId: "1:166068049854:web:bfb3c7e36958e80ab08bef",
  measurementId: "G-MYWGCK79FE",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;