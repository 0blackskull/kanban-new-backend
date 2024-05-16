import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_URI || '';

export type User = {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

class Users {
  collection: Collection
  constructor(db: Db) {
    this.collection = db.collection('users');
  }
}

class DB {
  client: MongoClient
  db: Db
  Users: Users

  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })

    this.db = this.client.db(process.env.DB_NAME || 'sprint');

    this.Users = new Users(this.db);

  }

  async run() {
    try {
      await this.client.connect();
      console.info('MongoDB connection success');
    } catch (error) {
      console.error(`Error in mongo connection: ${error}`)
    }
  }

  async init() {
    this.run().catch(console.dir);
  }

  async disconnect() {
    try {
      await this.client.close();
      console.info('MongoDB disconnected...');
    } catch (error) {
      console.error(`Error in disconnecting MongoDB: ${error}`)
    }
  }
}

export const db = new DB();