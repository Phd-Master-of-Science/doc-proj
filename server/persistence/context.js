import { localClient } from "./mongoClients.js"

// doc-proj database
const db = localClient.db("docDB");

// docDb Collections
export const directoriesCollection = db.collection("directories");
export const documentsCollection = db.collection("documents");
export const usersCollection = db.collection("users");
export const filesCollection = db.collection("files");