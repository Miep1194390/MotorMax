// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhzab8UiZYCS_FKNa9jqnNFJDBs7gB_V0",
  authDomain: "motormax-nl.firebaseapp.com",
  projectId: "motormax-nl",
  storageBucket: "motormax-nl.appspot.com",
  messagingSenderId: "342868942421",
  appId: "1:342868942421:web:67c73bd5c663558c6c3edc",
  measurementId: "G-9NHS9T9R9E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Function to create a meeting
export const createMeeting = async (meetingData) => {
  try {
    const docRef = await addDoc(collection(db, "meetings"), {
      ...meetingData,
      createdAt: serverTimestamp(),
    });
    console.log("Meeting created with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating meeting: ", error);
    throw new Error("Failed to create meeting");
  }
};

// Function to get meetings
export const getMeetings = async () => {
  try {
    const q = query(collection(db, "meetings"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const meetings = [];
    querySnapshot.forEach((doc) => {
      meetings.push({ id: doc.id, ...doc.data() });
    });
    return meetings;
  } catch (error) {
    console.error("Error getting meetings: ", error);
    throw new Error("Failed to get meetings");
  }
};
