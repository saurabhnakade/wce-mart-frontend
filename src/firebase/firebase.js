import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrgSPJ69CKrLS722DieGa2VFjyJsNw4ns",
    authDomain: "college-mart-1a4f7.firebaseapp.com",
    projectId: "college-mart-1a4f7",
    storageBucket: "college-mart-1a4f7.appspot.com",
    messagingSenderId: "61251606331",
    appId: "1:61251606331:web:02551660f6750f6c03091e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
