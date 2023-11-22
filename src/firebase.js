import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyD8fScyJaxZjBzuFtGarZIaM6SeuNR_pj0",
  authDomain: "blogimages-fabe0.firebaseapp.com",
  projectId: "blogimages-fabe0",
  storageBucket: "blogimages-fabe0.appspot.com",
  messagingSenderId: "572146463751",
  appId: "1:572146463751:web:a6308e6195b4c3116f66a2",
  measurementId: "G-1WNGQH1HYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export const sendImage = async (selected) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Generate a new UUID
      const id = uuidv4();

      const storageRef = ref(storage, `/images/${id}`);
      const uploadTask = uploadBytesResumable(storageRef, selected);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress, if needed
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({ downloadURL });
          });
        }
      );
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};
