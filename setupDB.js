const { MongoClient, ObjectId } = require('mongodb');

class DBClient {
  constructor() {
    this.client = new MongoClient(process.env.DB_HOST || 'mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.client.connect().then(() => {
      this.db = this.client.db(process.env.DB_DATABASE || 'files_manager');
    });
  }

  isAlive() {
    return !!this.client && !!this.db;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }

  async findUserByEmail(email) {
    return this.db.collection('users').findOne({ email });
  }

  async findUserById(id) {
    return this.db.collection('users').findOne({ _id: ObjectId(id) });
  }

  async createUser(email, password) {
    const result = await this.db.collection('users').insertOne({ email, password });
    return result.ops[0];
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
module.exports.ObjectId = ObjectId;

