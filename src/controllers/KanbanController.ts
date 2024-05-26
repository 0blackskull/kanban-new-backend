import { Request, Response } from "express";
import { db } from "../db";
import { createResponse } from "../utils";
import { ObjectId } from "mongodb";

const createTicket = async (req: Request, res: Response) => {
  const newTicket = req.body;

  try {
    const data = await db.Tickets.collection.insertOne({
      createdAt: new Date(),
      updatedAt: new Date(),
      ...newTicket,
    });

    return createResponse(res, 201, data);
  } catch (error) {
    console.error(`Error in creating ticket: ${error}`);

    createResponse(res, 500, "Internal server error");
  }
};

const getAllDashboards = async (req: Request, res: Response) => {
  try {
    const data = await db.Dashboards.collection
      .find({}, { projection: { title: 1 } })
      .toArray();

    return createResponse(res, 200, data);
  } catch (error) {
    console.error(`Error in fetching dashboards: ${error}`);

    createResponse(res, 500, "Internal server error");
  }
};

const getAllTickets = async (req: Request, res: Response) => {
  try {
    const data = await db.Tickets.collection.find().toArray();

    return createResponse(res, 200, data);
  } catch (error) {
    console.error(`Error in fetching dashboards: ${error}`);

    createResponse(res, 500, "Internal server error");
  }
};

const getDashboard = async (req: Request, res: Response) => {
  try {
    const title = req.params.title as string;

    console.log(title);

    const data = await db.Dashboards.collection.findOne({ title });

    console.log(data);

    return createResponse(res, 200, {
      ...data,
    });
  } catch (error) {
    console.error(`Error in fetching dashboards: ${error}`);

    createResponse(res, 500, "Internal server error");
  }
};

const updateTicket = async (req: Request, res: Response) => {
  const ticketId = req.params?.id;
  const { _id, ...updateFields } = req.body;

  try {
    const results = db.Tickets.collection.updateOne(
      { _id: new ObjectId(ticketId) },
      { $set: { ...updateFields, updatedAt: new Date() } }
    );

    return createResponse(res, 200, results);
  } catch (error) {
    console.error(`Error in updating ticket: ${error}`);

    createResponse(res, 500, "Internal server error");
  }
};

export const Kanban = {
  getAllDashboards,
  getDashboard,
  createTicket,
  getAllTickets,
  updateTicket,
};
