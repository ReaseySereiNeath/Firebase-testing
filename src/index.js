import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbW11HC-32y8qEPObmCSEHL9xuj9zmIGM",
  authDomain: "fir-test-b3d78.firebaseapp.com",
  projectId: "fir-test-b3d78",
  storageBucket: "fir-test-b3d78.appspot.com",
  messagingSenderId: "838685189263",
  appId: "1:838685189263:web:4736f3cd83e40ff8833cfa",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

//get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
    // console.log(snapshot);
  })
  .catch((err) => {
    console.log(err.message);
  });
