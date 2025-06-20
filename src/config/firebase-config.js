// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCE50ADzGtzCMJs0nGvV5ne6l1Iw0IWOys",
  authDomain: "fir-project-2d771.firebaseapp.com",
  projectId: "fir-project-2d771",
  storageBucket: "fir-project-2d771.firebasestorage.app",
  messagingSenderId: "78556158894",
  appId: "1:78556158894:web:2537ddffcbcfcfdbe6063f",
  measurementId: "G-J51WQNSLR2"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Use this function to get analytics safely
let analyticsInstance = null
const getAnalyticsInstance = async () => {
  if (!analyticsInstance && (await isSupported())) {
    analyticsInstance = getAnalytics(app)
  }
  return analyticsInstance
}

export { app, db, getAnalyticsInstance }