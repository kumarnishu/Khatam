import { IUser } from "./user.types"

export type ICompany = {
    _id: string,
    name: string,
    email: string,
    mobile: string,
    pincode: string,
    address: string
    country: string,
    created_at: Date,
    updated_at: Date,
    created_by: IUser,
    updated_by: IUser
}