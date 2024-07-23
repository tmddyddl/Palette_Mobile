import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const profileImgConfig = {
  apiKey: "AIzaSyAlOaRK740U7a8D_qNbX1wguCzciLVvv-8",
  authDomain: "palette-49418.firebaseapp.com",
  projectId: "palette-49418",
  storageBucket: "palette-49418.appspot.com",
  messagingSenderId: "900991085199",
  appId: "1:900991085199:web:9d645141bae04775e35efa",
  measurementId: "G-XYJF3CQDMJ",
};
const profileImgapp = initializeApp(profileImgConfig, "palette");
const profileStorage = getStorage(profileImgapp);

export {
  profileImgapp,
  profileStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
