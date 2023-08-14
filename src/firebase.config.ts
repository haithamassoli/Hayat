import Constants from "expo-constants";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} = Constants?.expoConfig?.extra?.firebase;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
