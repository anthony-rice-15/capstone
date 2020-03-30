import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { app } from "./app";

const mongoClient = app.getServiceClient(RemoteMongoClient.factory,"freemanfreetime-atlas");

const data = mongoClient.db("freemanData").collection("fData");

export {data};
