import { Stitch } from "mongo-stitch-browser-sdk";

const APP_ID = "freemanfreetime-nxcyw";

const app = Stitch.hasAppClient(APP_ID) ? Stitch.getAppClient(APP_ID) : Stitch.initializeAppClient(APP_ID);

export {app};
