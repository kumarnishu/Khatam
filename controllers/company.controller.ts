import { NextFunction, Request, Response } from "express"
import { Company } from "../models/company.model";
import { ICompany } from "../types/company.types";


export const GetPaginatedCompanies = async (req: Request, res: Response, next: NextFunction) => {
    let limit = Number(req.query.limit)
    let page = Number(req.query.page)
    if (!Number.isNaN(limit) && !Number.isNaN(page)) {
        let companies = await Company.find().populate("created_by").populate("updated_by").skip((page - 1) * limit).limit(limit)
        let count = await Company.find().countDocuments()
        return res.status(200).json({
            companies,
            total: Math.ceil(count / limit),
            page: page,
            limit: limit
        })
    }
    else
        return res.status(400).json({ message: "bad request" })
}

export const GetCompanies = async (req: Request, res: Response, next: NextFunction) => {
    const companies = await Company.find().populate("created_by").populate("updated_by")
    res.status(200).json(companies)
}

export const FuzzySearchCompanies = async (req: Request, res: Response, next: NextFunction) => {
    let limit = Number(req.query.limit)
    let page = Number(req.query.page)
    let key = String(req.query.key).split(",")
    let count = 0
    if (!key)
        return res.status(500).json({ message: "bad request" })
    let companies: ICompany[] = []
    if (!Number.isNaN(limit) && !Number.isNaN(page)) {
        if (key.length == 1 || key.length > 4) {
            companies = await Company.find({
                $or: [
                    { name: { $regex: key[0], $options: 'i' } },
                    { email: { $regex: key[0], $options: 'i' } },
                    { mobile: { $regex: key[0], $options: 'i' } },
                    { pincode: { $regex: key[0], $options: 'i' } },
                    { address: { $regex: key[0], $options: 'i' } },
                    { country: { $regex: key[0], $options: 'i' } },
                ]

            }
            ).populate('updated_by').populate('created_by').sort('-created_at').skip((page - 1) * limit).limit(limit)
            count = await Company.find({
                $or: [
                    { name: { $regex: key[0], $options: 'i' } },
                    { email: { $regex: key[0], $options: 'i' } },
                    { mobile: { $regex: key[0], $options: 'i' } },
                    { pincode: { $regex: key[0], $options: 'i' } },
                    { address: { $regex: key[0], $options: 'i' } },
                    { country: { $regex: key[0], $options: 'i' } },
                ]

            }
            ).countDocuments()
        }
        if (key.length == 2) {
            companies = await Company.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    }
                ]
                ,

            }
            ).populate('updated_by').populate('created_by').sort('-created_at').skip((page - 1) * limit).limit(limit)
            count = await Company.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    }
                ]
                ,

            }
            ).countDocuments()
        }
        if (key.length == 3) {
            companies = await Company.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    }
                ]
                ,

            }
            ).populate('updated_by').populate('created_by').sort('-created_at').skip((page - 1) * limit).limit(limit)
            count = await Company.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                            
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                            
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                            
                        ]
                    }
                ]
                ,

            }
            ).countDocuments()
        }
        if (key.length == 4) {
            companies = await Company.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    }
                ]
                ,

            }
            ).populate('updated_by').populate('created_by').sort('-created_at').skip((page - 1) * limit).limit(limit)
            count = await Company.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    },
                    {
                        $or: [
                            { name: { $regex: key[0], $options: 'i' } },
                            { email: { $regex: key[0], $options: 'i' } },
                            { mobile: { $regex: key[0], $options: 'i' } },
                            { pincode: { $regex: key[0], $options: 'i' } },
                            { address: { $regex: key[0], $options: 'i' } },
                            { country: { $regex: key[0], $options: 'i' } },
                        ]
                    }
                ]
                ,

            }
            ).countDocuments()
        }

        return res.status(200).json({
            companies,
            total: Math.ceil(count / limit),
            page: page,
            limit: limit
        })
    }
    else
        return res.status(400).json({ message: "bad request" })
}



