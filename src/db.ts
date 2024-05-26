import { Collection, Db, MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI || "";

export type User = {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Ticket = {
  title: string;
  description: string;
  assignedTo: string;
  createdBy: string;
  watcher: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Dashboard = {
  title: string;
  tickets: Array<string>;
  createdAt: Date;
  updatedAt: Date;
};

class Users {
  collection: Collection<User>;
  constructor(db: Db) {
    this.collection = db.collection("users");
  }
}

class Dashboards {
  collection: Collection<Dashboard>;
  constructor(db: Db) {
    this.collection = db.collection("dashboards");
  }
}

class Tickets {
  collection: Collection<Ticket>;
  constructor(db: Db) {
    this.collection = db.collection("Tickets");
  }
}

class DB {
  client: MongoClient;
  db: Db;
  Users: Users;
  Dashboards: Dashboards;
  Tickets: Tickets;

  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    this.db = this.client.db(process.env.DB_NAME || "sprint");

    this.Users = new Users(this.db);

    this.Dashboards = new Dashboards(this.db);

    this.Tickets = new Tickets(this.db);
  }

  async run() {
    try {
      await this.client.connect();
      console.info("MongoDB connection success");
    } catch (error) {
      console.error(`Error in mongo connection: ${error}`);
    }
  }

  async init() {
    this.run().catch(console.dir);
  }

  async disconnect() {
    try {
      await this.client.close();
      console.info("MongoDB disconnected...");
    } catch (error) {
      console.error(`Error in disconnecting MongoDB: ${error}`);
    }
  }
}

export const db = new DB();
