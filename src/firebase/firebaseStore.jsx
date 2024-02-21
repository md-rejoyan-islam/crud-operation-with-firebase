import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import firebaseApp, { storage } from "./firebase";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";

const db = getFirestore(firebaseApp);

// get all the documents from a collection
export const getCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data;
};

// get real-time updates from a collection
export const getRealTimeCollection = (collectionName, callback) => {
  const unsubscribe = onSnapshot(
    query(
      collection(db, collectionName),
      // where("status", "==", true),
      orderBy("name", "asc")
    ),
    (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      callback(data);
    }
  );
  return unsubscribe;
};

// get single document from a collection
export const getDocument = async (collectionName, docId) => {
  const docRef = await getDoc(doc(db, collectionName, docId));
  return { ...docRef.data(), id: docRef.id };
};

// delete document from collection
export const deleteDocument = async (collectionName, docId) => {
  // find document
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  // photo name
  const photoName = docSnap.data().photo.split("?")[0].split("/").pop();

  await deleteDoc(doc(db, collectionName, docId));

  // file delete from storage

  try {
    const fileRef = ref(storage, photoName);
    const data = await getDownloadURL(fileRef);

    if (data) {
      await deleteObject(fileRef);
    }
  } catch (error) {
    // console.log(error);
  }

  // console.log(fileRef);

  return true;
};

// update document in collection
export const updateDocument = async (collectionName, docId, data) => {
  await updateDoc(doc(db, collectionName, docId), data);
  return true;
};

// create document with custom id
export const createDocumentWithId = async (collectionName, docId, data) => {
  await setDoc(doc(db, collectionName, docId), data);
  return true;
};

// add a document to a collection
export const addDocument = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
};
