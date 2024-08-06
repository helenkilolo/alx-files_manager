const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'files_manager';

async function main() {
  let client;

  try {
    client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log("Connected successfully");

    const db = client.db(dbName);

    // Check 'users' collection
    await checkAndInsert(db, 'users', 4, { name: 'User' });

    // Check 'files' collection
    await checkAndInsert(db, 'files', 30, { name: 'File' });

  } catch (err) {
    console.error('Error connecting to MongoDB: ', err);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function checkAndInsert(db, collectionName, requiredCount, document) {
  try {
    const collection = db.collection(collectionName);
    const count = await collection.countDocuments();

    if (count < requiredCount) {
      const documents = Array.from({ length: requiredCount - count }, (_, i) => ({
        ...document,
        name: `${collectionName} ${i + count + 1}`
      }));

      await collection.insertMany(documents);
      console.log(`Inserted ${documents.length} documents into '${collectionName}'`);
    } else {
      console.log(`'${collectionName}' already has the required number of documents`);
    }

  } catch (err) {
    console.error(`Error checking or inserting documents into '${collectionName}': `, err);
  }
}

// Run the main function
main();

