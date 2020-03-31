import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { app } from "./app";

const mongoClient = app.getServiceClient(RemoteMongoClient.factory,"freemanfreetime-atlas");

const data = mongoClient.db("googlesheetsdb").collection("gym_records");

export {data};
