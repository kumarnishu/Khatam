import React, { useReducer } from "react"

type UserMenu = "profile_menu" | "close_user_menu" | "user_menu"


type MenuState = {
    type: UserMenu | null,
    anchorEl: HTMLElement | null
}

const initialState: MenuState = {
    type: null,
    anchorEl: null
}


export enum UserMenuActions {
    profile_menu = "profile_menu",
    close_user_menu = "close_user_menu",
    user_menu = "user_menu"
}

type Action = {
    type: UserMenuActions 
    anchorEl: HTMLElement | null
}

// reducer
function reducer(state: MenuState | null, action: Action) {
    let type = action.type
    switch (type) {
        case UserMenuActions.profile_menu: return action
        case UserMenuActions.close_user_menu: return action
        case UserMenuActions.user_menu: return action

        default: return state
    }
}
type Context = {
    menu: MenuState | null,
    setMenu: React.Dispatch<Action>
}
export const MenuContext = React.createContext<Context>(
    {
        menu: { type: null, anchorEl: null },
        setMenu: () => null
    }
)
export function MenuProvider(props: { children: JSX.Element }) {
    const [menu, setMenu] = useReducer(reducer, initialState)
    return (
        <MenuContext.Provider value={{ menu, setMenu }}>
            {props.children}
        </MenuContext.Provider>
    )

}
