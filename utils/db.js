const { MongoClient, ObjectId } = require('mongodb');

class DBClient {
	  constructor() {
		      const host = process.env.DB_HOST || 'localhost';
		      const port = process.env.DB_PORT || 27017;
		      const dbName = process.env.DB_DATABASE || 'files_manager';

		      this.client = new MongoClient(`mongodb://${host}:${port}`, { useUnifiedTopology: true });
			          this.client.connect()
			            .then(() => {
					            this.db = this.client.db(dbName);
					            console.log('MongoDB client connected to the server');
					          })
			            .catch((err) => console.error('MongoDB client not connected to the server:', err));
			        }

	  isAlive() {
		      return !!this.db;
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

	  async createUser(email, password) {
		      const result = await this.db.collection('users').insertOne({ email, password });
		      return result.ops[0];
		    }

	  async findUserById(id) {
		      return this.db.collection('users').findOne({ _id: new ObjectId(id) });
		    }
}

const dbClient = new DBClient();
module.exports = dbClient;

