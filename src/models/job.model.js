import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        company: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        salary: {
            type: String,
            required: true,
        },

        jobType: {
            type: String,
            enum: ["Part-time", "Full-time", "Internship", "Contract"],
            required: true,
        },
        requirements: {
            type: [String],
            default: [],
        },

        benefits: {
            type: [String],
            default: [],
        },

        shift: {
            type: String,
            enum: [
                "Morning shift",
                "Evening shift",
                "Day shift",
                "Rotational shift",
                "Weekend availability",
            ],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        applyLink: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
