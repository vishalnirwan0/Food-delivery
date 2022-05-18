import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCmrtZhje4r1HTCm4Cmmu7Q4E3JOw53ll4",
    authDomain: "food-delivery-web-c97b6.firebaseapp.com",
    projectId: "food-delivery-web-c97b6",
    storageBucket: "food-delivery-web-c97b6.appspot.com",
    messagingSenderId: "504141093215",
    appId: "1:504141093215:web:f9f51b60d2838deee67eea"
  };

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);
  
  export const storage = getStorage(firebase);
  export default db;
