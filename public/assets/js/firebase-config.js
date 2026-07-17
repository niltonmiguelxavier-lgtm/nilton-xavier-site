import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCujprY5enftquGVq-IO-zv61BZ_8OQwt8",
    authDomain: "nilton-xavier.firebaseapp.com",
      projectId: "nilton-xavier",
        storageBucket: "nilton-xavier.firebasestorage.app",
          messagingSenderId: "583993681564",
            appId: "1:583993681564:web:73f1290fd7a2aebc01ef59",
              measurementId: "G-QGHHEFVPHD"
              };

              const app = initializeApp(firebaseConfig);
              export const auth = getAuth(app);
              export const db = getFirestore(app);
              export const storage = getStorage(app);