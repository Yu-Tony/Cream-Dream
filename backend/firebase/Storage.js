const { getStorage } = require("firebase/storage");
const { FirebaseApp } = require("./FirebaseApp");

const Storage = getStorage(FirebaseApp);

exports.Storage = Storage;
