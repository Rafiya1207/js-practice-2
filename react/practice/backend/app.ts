import { MongoClient } from "mongodb";

const uri =
"mongodb+srv://rafiya1207_db_user:readit123@cluster0.4bimufo.mongodb.net/Readit?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri);

try {
  await client.connect();
  console.log("Connected");
} catch (err) {
  console.error("Connection failed:", err);
} finally {
  await client.close();
}