// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const storage = getStorage(app);

export default storage;
