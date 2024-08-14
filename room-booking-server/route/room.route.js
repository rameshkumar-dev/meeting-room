import express from "express";
import { authUser } from "../middleware/authUser.js";
import { bookRoom, createRoom, searchRoom, viewRoom } from "../controller/room.controller.js";

const roomRoutes = express.Router();

roomRoutes.post("/create", createRoom);

roomRoutes.get("/search", authUser, searchRoom);

roomRoutes.get("/view/:roomId", authUser, viewRoom);

roomRoutes.post("/book", authUser, bookRoom);

export default roomRoutes;