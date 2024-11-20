import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(docRef);
  } catch (err) {
    console.log("write to db ", err);
  }
}

export async function deleteFromDB(deletedId, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, deletedId));
    // also delete the users subcollections if exists
    deleteAllFromDB(`goals/${deletedId},users`);
  } catch (err) {
    console.log("delete from DB ", err);
  }
}

export async function updateDB(id, data, collectionName) {
  try {
    await setDoc(doc(database, collectionName, id), data, { merge: true });
  } catch (err) {
    console.log("update DB ", err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    //get all the documents in the collection
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
      deleteDoc(doc(database, collectionName, docSnapshot.id));
    });
  } catch (err) {
    console.log("delete all ", err);
  }
}

export async function getAllDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    const data = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((docSnap) => {
        data.push(docSnap.data());
      });
    }
    return data;
  } catch (err) {
    console.log("get all docs ", err);
  }
}

export async function getOneDocument(id, collectionName) {
  try {
    const docSnapshot = await getDoc(doc(database, collectionName, id));

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
    return null;
  } catch (err) {
    console.log("get one doc ", err);
  }
}

// lab6 Q1: We use addDoc because there is no need to specify the document ID. 
// Firestore will automatically generate a unique ID for the document.
// However, if we want to specify the document ID, we can use setDoc instead.
// lab6 Q3: We should use updateDoc instead of setDoc with {merge: true} because
// updateDoc is used to update an existing document with specific fields,
// while setDoc with {merge: true} is used to create a new document or overwrite an existing document with specific fields.

export async function getAllDocuemnts(collectionName) {
  try {
  const querySnapshot = await getDocs(collection(database, collectionName));
  const data = [];
  if (!querySnapshot.empty) {
      querySnapshot.forEach((docSnap) => {
        data.push(docSnap.data());
    });
  }
  return data;
  } catch (err) {
  console.log("get all docs", err);
  }
}