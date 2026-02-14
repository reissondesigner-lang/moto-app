import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOtY6yDvNRv31rtUdmcQdIKc2uHFf-BrY",
  authDomain: "moto-rei.firebaseapp.com",
  projectId: "moto-rei",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, updateDoc };
