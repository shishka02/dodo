import firebase from "firebase/app";
import "firebase/database";
var config = {
  apiKey: "AIzaSyDX2zAjIzTB9fu7hadZLZmjqscraC3uTH8",
  authDomain: "dodo-75272.firebaseapp.com",
  databaseURL: "https://dodo-75272.firebaseio.com",
  projectId: "dodo-75272",
  storageBucket: "dodo-75272.appspot.com",
  messagingSenderId: "1065766410382"
};
firebase.initializeApp(config);

const database = firebase.database();
export default database;
//firebaseApp.firestore().settings({ timestampsInSnapshots: true })
export const addRoomToFirebase = task => {
  const id = task.quality;

  database.ref(`/rooms/${id}`).set(task);
};
export const addDateToFirebase = (task, choice, arr) => {
  database.ref(`/rooms/${choice}/customers/${task.id}`).set(task);
  database.ref(`/rooms/${choice}/dates/${task.id}`).set(arr);
};
export const removeRoomFromFirebase = task => {
  database.ref(`/rooms/${task.quality}/dates/${task.id}`).remove();
  database.ref(`/rooms/${task.quality}/customers/${task.id}`).remove();
};
