import { MongoClient } from "mongodb";
const uri = process.env.MANGODB_URI;

if (!uri) throw new Error("uri mongodb invalid");

export const client = new MongoClient(uri);
