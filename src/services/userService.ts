import { db } from "../db"
import bcrypt from "bcrypt";

export const createUser = async (username: string, password: string) => {
  const saltRounds = 10;
  const curDate = new Date();

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) {
      throw Error(`Error in hash generation: ${err}`);
    }

    const data = await db.Users.collection.insertOne({
      username,
      password: hash,
      createdAt: curDate,
      updatedAt: curDate,
    })

    return data;
  });
}

export const getUser = async (username: string) => {
  const user = await db.Users.collection.findOne({ username });

  return user;
}

export const UserService = {
  getUser,
  createUser
}