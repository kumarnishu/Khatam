import mongoose from "mongoose"
import { ICompany } from "../types/company.types";

const CompanySchema = new mongoose.Schema<ICompany, mongoose.Model<ICompany, {}, {}>, {}>({
    name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    mobile: {
        type: String,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    pincode: {
        type: String,
        trim: true,
        lowercase: true,
    },
    country: {
        type: String,
        trim: true,
        lowercase: true,
    },
    address: {
        type: String,
        trim: true,
        lowercase: true,
    },
     created_at: {
        type: Date,
        default: new Date(),
        required: true,

    },

    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updated_at: {
        type: Date,
        default: new Date(),
        required: true,

    },

    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


})

export const Company = mongoose.model<ICompany, mongoose.Model<ICompany, {}, {}>>("Company", CompanySchema)