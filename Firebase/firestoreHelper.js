import { addDoc, collection } from "firebase/firestore";
import {database} from "./firebaseSetup";

export async function writeToDB(collectionName, data) {
  try {
    await addDoc(collection(database,collectionName), data);
    console.log(databse);
  } catch (err){
    console.log("write to db", err);
  }
}