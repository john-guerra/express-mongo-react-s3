const MongoClient = require("mongodb");

function mongoLib() {
  const mongoLib = {};

  // Connection URL
  const url = "mongodb://localhost:27017";

  // Database Name
  const dbName = "imagesdb";

  mongoLib.addFile = (fileUrl) => {
    // Create a new MongoClient
    // const client = new MongoClient(url, { useUnifiedTopology: true });

    return MongoClient.connect(url).then((client) => {
      const col = client.db(dbName).collection("images");

      return col.insert({ url: fileUrl });
    });
  };

  mongoLib.getFiles = () => {
    return MongoClient.connect(url).then((client) => {
      const col = client.db(dbName).collection("images");

      return col.find().toArray();
    });
  };
  return mongoLib;
}

module.exports = mongoLib();
