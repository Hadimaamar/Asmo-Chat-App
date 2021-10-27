import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAM1JU-pelIfPD0HKRtiuEHz_xrW4GmB18",
  authDomain: "asmo-shop.firebaseapp.com",
  projectId: "asmo-shop",
  storageBucket: "asmo-shop.appspot.com",
  messagingSenderId: "25467616557",
  appId: "1:25467616557:web:7df57d718aea47032667a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
