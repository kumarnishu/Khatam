import { Access } from "./access.types"
import { Asset } from "./asset.types"
import { ICompany } from "./company.types"

export type IUser = {
    _id: string,
    username: string,
    password: string,
    email: string,
    mobile: string,
    dp: Asset,
    is_admin: Boolean,
    is_crm_admin:Boolean,
    email_verified: Boolean,
    mobile_verified: Boolean,
    company: ICompany,
    is_active: Boolean,
    last_login: Date,
    multi_login_token: string | null,
    is_multi_login: boolean,
    assigned_users: IUser[]
    client_id: string,
    client_data_path: string,
    connected_number: string,
    user_access_fields: Access,
    company_access_fields: Access,
    crm_access_fields: Access,
    report_access_fields: Access,
    backup_access_fields: Access,
    created_at: Date,
    updated_at: Date,
    created_by: IUser,
    updated_by: IUser
    resetPasswordToken: string | null,
    resetPasswordExpire: Date | null,
    emailVerifyToken: string | null,
    emailVerifyExpire: Date | null
}

