import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

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

//queries (where) it mean to filter data (like where author == colleen hoover)
// const q = query(colRef, where("author", "==", "colleen hoover"), orderBy("createdAt"));

//queries (orderBy) it mean to sort data (like order by createdAt) (asc or desc) (default is asc) and which all data
const q = query(colRef, orderBy("createdAt"));

//get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//     // console.log(snapshot);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

//get real time collection data
onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});


//adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

//deleteing documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
