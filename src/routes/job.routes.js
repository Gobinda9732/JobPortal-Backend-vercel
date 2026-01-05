import express from "express";
import { getAllJob, getJobUsingId, getJobUsingPagination, createJob, deleteJobUsingId } from "../controllers/job.controller.js";
import { verifyToken } from "../utils/jwtVerification.js";

const JobRoutes = express.Router();


JobRoutes.get("/get-all-job", verifyToken, getAllJob)
JobRoutes.get("/get-job/:id", getJobUsingId)
JobRoutes.get("/get-job-using-pagination", getJobUsingPagination);
JobRoutes.post("/create-job", verifyToken, createJob);
JobRoutes.delete("/delete-job/:id", verifyToken, deleteJobUsingId)


export default JobRoutes;
