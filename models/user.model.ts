import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { IUser, IUserMethods } from "../types/user.types";

const UserSchema = new mongoose.Schema<IUser, mongoose.Model<IUser, {}, IUserMethods>, IUserMethods>({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    mobile: {
        type: String,
        trim: true,
        required: true,
    },
    multi_login_token: String,
    is_multi_login: {
        type: Boolean,
        default: true,
    },
    dp: {
        _id: { type: String },
        filename: { type: String },
        public_url: { type: String },
        content_type: { type: String },
        size: { type: String },
        bucket: { type: String },
        created_at: Date
    },
    is_crm_admin: Boolean,
    is_admin: {
        type: Boolean,
        default: false,
        required: true,
    },
    client_id: {
        type: String,
        required: true,
        trim: true,
    },
    client_data_path: {
        type: String,
        required: true,
        trim: true,
    },
    connected_number: {
        type: String,
        trim: true,
        index: true
    },
    mobile_verified: {
        type: Boolean,
        default: false,
        required: true
    },
    email_verified: {
        type: Boolean,
        default: false,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true,
        required: true
    },

    user_access_fields: {
        is_hidden: { type: Boolean, default: false },
        is_deletion_allowed: { type: Boolean, default: false },
        is_editable: { type: Boolean, default: false },
    },
    crm_access_fields: {
        is_hidden: { type: Boolean, default: false },
        is_deletion_allowed: { type: Boolean, default: false },
        is_editable: { type: Boolean, default: false },
    },
    company_access_fields: {
        is_hidden: { type: Boolean, default: false },
        is_deletion_allowed: { type: Boolean, default: false },
        is_editable: { type: Boolean, default: false },
    },
    report_access_fields: {
        is_hidden: { type: Boolean, default: false },
        is_deletion_allowed: { type: Boolean, default: false },
        is_editable: { type: Boolean, default: false },
    },
    backup_access_fields: {
        is_hidden: { type: Boolean, default: false },
        is_deletion_allowed: { type: Boolean, default: false },
        is_editable: { type: Boolean, default: false },
    },
    assigned_users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    last_login: {
        type: Date,
        default: new Date(),
        required: true,

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

    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpire: {
        type: Date,
        default: null
    },
    emailVerifyToken: {
        type: String,
        default: null
    },
    emailVerifyExpire: {
        type: Date,
        default: null
    },
})

// hashing passwords
UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10)
});
// // authenticaion tokens
UserSchema.method(
    "getAccessToken", function () {
        return jwt.sign({ id: this._id }, process.env.JWT_ACCESS_USER_SECRET || "kkskhsdhk", {
            expiresIn: process.env.JWT_ACCESS_EXPIRE,
        });
    }
)

// Compare Password
UserSchema.method("comparePassword", function (password: string) {
    return bcrypt.compare(password, this.password);
})

// Generating Password Reset Token
UserSchema.method("getResetPasswordToken", function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetPasswordToken = resetToken
    this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    return resetToken;
})
//generating email verification token
UserSchema.method("getEmailVerifyToken", function () {
    const emailToken = crypto.randomBytes(32).toString('hex');
    this.emailVerifyToken = emailToken
    this.emailVerifyExpire = new Date(Date.now() + 15 * 60 * 1000);
    return emailToken;
})
export const User = mongoose.model<IUser, mongoose.Model<IUser, {}, IUserMethods>>("User", UserSchema)