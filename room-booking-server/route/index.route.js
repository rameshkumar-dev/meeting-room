import express from "express";
import { generateAccessToken } from "../controller/index.controller.js";
import { checkToken } from "../middleware/checkToken.js";

const indexRoutes = express.Router();

indexRoutes.get("/access-token",checkToken, generateAccessToken);

export default indexRoutes;