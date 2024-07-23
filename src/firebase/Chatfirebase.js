import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const chatfirebaseConfig = {
  apiKey: "AIzaSyCq2FhO3wiw3TmFay5DbTW7mD_Psi37XzI",
  authDomain: "palette-669a8.firebaseapp.com",
  projectId: "palette-669a8",
  storageBucket: "palette-669a8.appspot.com",
  messagingSenderId: "767875839401",
  appId: "1:767875839401:web:f43af70b91c88f9cba00b8",
  measurementId: "G-44V75XSYP6",
};

let chatapp;
if (!getApps().some((app) => app.name === "chatApp")) {
  chatapp = initializeApp(chatfirebaseConfig, "chatApp");
} else {
  chatapp = getApps().find((app) => app.name === "chatApp");
}

const chatstorage = getStorage(chatapp);

export { chatstorage };
