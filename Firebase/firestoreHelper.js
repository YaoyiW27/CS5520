import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {database} from "./firebaseSetup";

export async function writeToDB(collectionName, data) {
  try {
    // Validate that collectionName is a string and data is an object
    if (typeof collectionName !== 'string' || typeof data !== 'object' || data === null) {
      throw new TypeError("Invalid parameters for writeToDB: collectionName must be a string and data must be an object");
    }

    await addDoc(collection(database, collectionName), data);
    console.log("Data successfully written to Firestore:", data);
  } catch (err) {
    console.log("Error in writeToDB:", err);
  }
}
// lab6 Q1: We use addDoc because there is no need to specify the document ID. 
// Firestore will automatically generate a unique ID for the document.
// However, if we want to specify the document ID, we can use setDoc instead.

export async function deleteFromDB(collectionName, docId){
  try {
    await deleteDoc(doc(database, collectionName, docId));
  } catch (err){
    console.log("delete from db", err);
  }
}

export async function deleteAll(collectionName){
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
        deleteFromDB(collectionName, docSnapshot.id);
  });
  } catch (err) {
  console.log("delete from db", err);
  }
}

// Function to update the Firestore document with a warning field
export async function addWarningToGoal(docId) {
  try {
    const goalDocRef = doc(database, "goals", docId); 
    await updateDoc(goalDocRef, {
      warning: true, 
    });
    console.log("Document successfully updated with warning");
  } catch (err) {
    console.log("Error updating document with warning: ", err);
  }
}

// lab6 Q3: We should use updateDoc instead of setDoc with {merge: true} because
// updateDoc is used to update an existing document with specific fields,
// while setDoc with {merge: true} is used to create a new document or overwrite an existing document with specific fields.