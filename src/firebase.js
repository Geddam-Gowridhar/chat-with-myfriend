import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyDTKRZxEBtumjMo8M_C_P526fULYITqsHw",
  authDomain: "chat-with-myfriend.firebaseapp.com",
  projectId: "chat-with-myfriend",
  storageBucket: "chat-with-myfriend.firebasestorage.app",
  messagingSenderId: "935590168243",
  appId: "1:935590168243:web:3c342e85bb2dd464ddd2c6",
  measurementId: "G-METNVBST7D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export default app;
export { analytics };
// Removed duplicate firebaseConfig export

