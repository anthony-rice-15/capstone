import {Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-browser-sdk";

const client = Stitch.initializeDefaultAppClient('freemanfreetime-nxcyw');

const db = client.getServiceClient(RemoteMongoClient.factory,"freemanfreetime-atlas").db("googlesheetsdb");

client.auth.loginWithCredential(new AnonymousCredential()).then(() =>
    db.collection('gym_records').find({}).asArray()
).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});



const data = -1;

export {data};
