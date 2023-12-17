import { IUser } from "./user.types"

export type FlowNode = {
    id: string,
    data: any,
    type: "DefaultNode" | "MenuNode" | "StartNode" | "OutputNode" | "CommonNode"
    parentNode: string
}
export type IFlow = {
    _id: string,
    flow_name: string,
    trigger_keywords: string,
    created_by: IUser,
    created_at: Date,
    updated_at: Date,
    updated_by: IUser,
    nodes: FlowNode[],
    edges: Object[],
    is_active: Boolean,
    connected_users: IUser[]
}
export type IKeywordTracker = {
    _id: string,
    phone_number: string,
    bot_number: string,
    is_active: boolean,
    skip_main_menu: boolean,
    flow: IFlow,
    updated_at: Date
}
export type IMenuTracker = {
    _id: string,
    phone_number: string,
    bot_number: string,
    customer_name: string,
    is_active: boolean,
    menu_id: string,
    flow: IFlow,
    updated_at: Date
}
export type TFlowBody = Request['body'] & IFlow & FlowNode;
export type TrackerBody = Request['body'] & IMenuTracker