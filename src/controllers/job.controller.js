import Job from "../models/job.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";



// get all jobs
const getAllJob = async (req, res) => {
    try {
        const allJob = await Job.find();

        if (!allJob || allJob.length === 0) {
            const response = new ApiError(
                404,
                "No Job found",
                "No job found in the database"
            );
            return res.status(response.statusCode).json(response);
        }

        const response = new ApiResponse(
            200,
            "JOb fetched successfully",
            allJob
        );
        return res.status(response.statusCode).json(response);
    } catch (error) {
        const response = new ApiError(
            500,
            "Internal Server Error",
            error,
            error.message
        );
        return res.status(response.statusCode).json(response);
    }
};

//get job using id 
const getJobUsingId = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json(
                new ApiError(400, "Invalid Job ID", "Please provide a valid MongoDB ObjectId")
            );
        }

        const job = await Job.findById(id);


        if (!job) {
            const response = new ApiError(
                404,
                "Job not found",
                "No job exists with this ID"
            );
            return res.status(response.statusCode).json(response);
        }


        const response = new ApiResponse(
            200,
            "Job fetched successfully",
            job
        );
        return res.status(response.statusCode).json(response);

    } catch (error) {

        const response = new ApiError(
            500,
            "Internal Server Error",
            error,
            error.message
        );
        return res.status(response.statusCode).json(response);
    }
}

//get all jobs using pagination
const getJobUsingPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const total = await Job.countDocuments();

        const totalPages = Math.ceil(total / limit);

        const jobs = await Job.find({})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            const response = new ApiError(
                404,
                "jobs pagination not found",
                "jobs pagination not found in the database"
            );
            return res.status(response.statusCode).json(response);
        }
        const response = new ApiResponse(200, "Project fetched successfully", {
            jobs,
            currentPage: page,
            totalPages,
            totalJobs: total,
        });
        return res.status(response.statusCode).json(response);

    } catch (error) {
        const response = new ApiError(
            500,
            "Internal Server Error",
            error,
            error.message
        );
        return res.status(response.statusCode).json(response);
    }

};

//  create a job
const createJob = async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            salary,
            jobType,
            requirements,
            benefits,
            shift,
            description,
            applyLink
        } = req.body;

        if (
            !title ||
            !company ||
            !location ||
            !salary ||
            !jobType ||
            !Array.isArray(requirements) ||
            requirements.length === 0 ||
            !Array.isArray(benefits) ||
            benefits.length === 0 ||
            !shift ||
            !description
        ) {
            const response = new ApiError(
                400,
                "Missing required fields",
                "title, company, location, salary, jobType, requirements, benefits, shift, and description are required"
            );
            return res.status(response.statusCode).json(response);
        }


        const newJob = await Job.create({
            title,
            company,
            location,
            salary,
            jobType,
            requirements,
            benefits,
            shift,
            description,
            applyLink
        });

        if (!newJob) {
            const response = new ApiError(
                400,
                "Job not created",
                "Job not saved in database"
            );
            return res.status(response.statusCode).json(response);
        }

        const response = new ApiResponse(
            201,
            "Job created successfully",
            newJob
        );
        return res.status(response.statusCode).json(response);

    } catch (error) {
        const response = new ApiError(
            500,
            "Internal Server Error",
            error,
            error.message
        );
        return res.status(response.statusCode).json(response);
    }
}

const deleteJobUsingId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json(
                new ApiError(400, "Invalid Job ID", "Please provide a valid MongoDB ObjectId")
            );
        }

        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            const response = new ApiError(
                404,
                "Job not found",
                "No job exists with this ID"
            );
            return res.status(response.statusCode).json(response);
        }

        const response = new ApiResponse(
            200,
            "Job deleted successfully",
            deletedJob
        );
        return res.status(response.statusCode).json(response);

    } catch (error) {
        const response = new ApiError(
            500,
            "Internal Server Error",
            error,
            error.message
        );
        return res.status(response.statusCode).json(response);
    }
};


export { getAllJob, getJobUsingId, getJobUsingPagination, createJob, deleteJobUsingId };
