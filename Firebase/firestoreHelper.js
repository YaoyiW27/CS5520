import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import {database} from "./firebaseSetup";

export async function writeToDB(collectionName, data) {
  try {
    await addDoc(collection(database,collectionName), data);
    console.log(databse);
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
