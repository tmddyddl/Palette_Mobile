import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD1xdDL_o_nerwz68nRnsDMuHQKllfcuOQ",
  authDomain: "couplealbum-19c80.firebaseapp.com",
  projectId: "couplealbum-19c80",
  storageBucket: "couplealbum-19c80.appspot.com",
  messagingSenderId: "457304474187",
  appId: "1:457304474187:web:9b3922a6e60ee6e04c03ce",
  measurementId: "G-TQKE6NMEWZ",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage, ref, uploadBytesResumable, getDownloadURL };
