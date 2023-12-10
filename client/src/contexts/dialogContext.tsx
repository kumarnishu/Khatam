import React, { useReducer } from "react"

type UserChoices = "signup" | "reset_password_mail" | "close_user" | "new_user" | "update_user" | "update_profile" | "view_profile" | "update_password" | "reset_password" | "verify_email" | "control_access" | "delete_user" | "toogle_flow_status" | "block_user" | "unblock_user" | "make_admin" | "remove_admin" | "refresh_whatsapp" | "update_user_password" | "block_multi_login" | "reset_multi_login" | "assign_users"

type CrmChoices = "create_lead" | "update_lead" | "add_remark" | "view_remarks" | "close_lead" | "display_filter" | "delete_lead" | "convert_customer" | "lead_advance_filter" | "create_refer" | "update_refer" | "delete_refer" | "view_referrals" | "bulk_delete_useless_leads" | "convert_useless"
  | "refer_lead" | "remove_referral" | "assign_refer" | "bulk_assign_leads" | "bulk_assign_refers" | "delete_remark" | "update_remark"



type ChoiceState = UserChoices|CrmChoices

const initialState: ChoiceState | null = null


export enum UserChoiceActions {
  signup = "signup",
  reset_password_mail = "reset_password_mail",
  close_user = "close_user",
  new_user = "new_user",
  update_user = "update_user",
  update_profile = "update_profile",
  view_profile = "view_profile",
  reset_password = "reset_password",
  update_password = "update_password",
  verify_email = "verify_email",
  block_user = "block_user",
  unblock_user = "unblock_user",
  make_admin = "make_admin",
  remove_admin = "remove_admin",
  delete_user = "delete_user",
  control_access = "control_access",
  refresh_whatsapp = "refresh_whatsapp",
  update_user_password = "update_user_password",
  block_multi_login = "block_multi_login",
  reset_multi_login = "reset_multi_login",
  assign_users = "assign_users"
}

export enum CrmChoiceActions {
  create_lead = "create_lead",
  update_lead = "update_lead",
  delete_lead = "delete_lead",
  delete_remark = "delete_remark",
  update_remark = "update_remark",
  view_remarks = "view_remarks",
  close_lead = "close_lead",
  convert_customer = "convert_customer",
  display_filter = "display_filter",
  add_remark = "add_remark",
  lead_advance_filter = "lead_advance_filter",
  create_refer = "create_refer",
  update_refer = "update_refer",
  delete_refer = "delete_refer",
  view_referrals = "view_referrals",
  refer_lead = "refer_lead",
  remove_referral = "remove_referral",
  bulk_delete_useless_leads = "bulk_delete_useless_leads",
  convert_useless = "convert_useless",
  assign_refer = "assign_refer",
  bulk_assign_leads = "bulk_assign_leads",
  bulk_assign_refers = "bulk_assign_refers"
}
type Action = {
  type: UserChoiceActions | CrmChoiceActions
}

// reducer
function reducer(state: ChoiceState | null, action: Action) {
  let type = action.type
  switch (type) {
    // user dialogs choices
    case UserChoiceActions.signup: return type
    case UserChoiceActions.reset_password_mail: return type
    case UserChoiceActions.new_user: return type
    case UserChoiceActions.update_user: return type
    case UserChoiceActions.update_profile: return type
    case UserChoiceActions.view_profile: return type
    case UserChoiceActions.update_password: return type
    case UserChoiceActions.reset_password: return type
    case UserChoiceActions.verify_email: return type
    case UserChoiceActions.block_user: return type
    case UserChoiceActions.unblock_user: return type
    case UserChoiceActions.make_admin: return type
    case UserChoiceActions.control_access: return type
    case UserChoiceActions.remove_admin: return type
    case UserChoiceActions.delete_user: return type
    case UserChoiceActions.close_user: return type
    case UserChoiceActions.update_user_password: return type
    case UserChoiceActions.reset_multi_login: return type
    case UserChoiceActions.block_multi_login: return type
    case UserChoiceActions.assign_users: return type

    case CrmChoiceActions.create_lead: return type
    case CrmChoiceActions.update_lead: return type
    case CrmChoiceActions.view_remarks: return type
    case CrmChoiceActions.add_remark: return type
    case CrmChoiceActions.display_filter: return type
    case CrmChoiceActions.delete_lead: return type
    case CrmChoiceActions.convert_customer: return type
    case CrmChoiceActions.lead_advance_filter: return type
    case CrmChoiceActions.close_lead: return type
    case CrmChoiceActions.create_refer: return type
    case CrmChoiceActions.update_refer: return type
    case CrmChoiceActions.delete_refer: return type
    case CrmChoiceActions.view_referrals: return type
    case CrmChoiceActions.refer_lead: return type
    case CrmChoiceActions.remove_referral: return type
    case CrmChoiceActions.bulk_delete_useless_leads: return type
    case CrmChoiceActions.assign_refer: return type
    case CrmChoiceActions.delete_remark: return type
    case CrmChoiceActions.update_remark: return type
    case CrmChoiceActions.convert_useless: return type
    case CrmChoiceActions.bulk_assign_leads: return type
    case CrmChoiceActions.bulk_assign_refers: return type

    default: return state
  }
}
// context
type Context = {
  choice: ChoiceState | null,
  setChoice: React.Dispatch<Action>
}
export const ChoiceContext = React.createContext<Context>(
  {
    choice: null,
    setChoice: () => null
  }
)
// provider
export function ChoiceProvider(props: { children: JSX.Element }) {
  const [choice, setChoice] = useReducer(reducer, initialState)
  return (
    <ChoiceContext.Provider value={{ choice, setChoice }}>
      {props.children}
    </ChoiceContext.Provider>
  )

}
