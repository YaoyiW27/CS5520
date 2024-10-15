import { addDoc, collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import {database} from "./firebaseSetup";

export async function writeToDB(collectionName, data) {
  try {
    await addDoc(collection(database,collectionName), data);
  } catch (err){
    console.log("write to db", err);
  }
}

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