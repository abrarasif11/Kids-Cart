const uri = process.env.MONGODB_URI;
const dbname = process.env.DB_NAME;
const collections = {
  PRODUCTS: "products",
};
const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export const dbConnect = (cname) => {
  return client.db(dbname).collection(cname);
};
