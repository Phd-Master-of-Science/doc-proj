import { localClient } from "./mongoClients.js"

// doc-proj database
const db = localClient.db("docDB");

// docDb Collections
export const directoriesCollection = db.collection("directories");
export const documentsCollection = db.collection("documents");
export const usersCollection = db.collection("users");
export const filesCollection = db.collection("files");
export const seedingsCollection = db.collection("seedings");

export const documentsRows = 1000000;
export const usersRows = 30000;
export const filesRows = 200000;