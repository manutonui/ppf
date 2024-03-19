import { AuthHook } from "./AuthHook";

export const LogoutHook = () => {
    const {dispatch} = AuthHook()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }

    return { logout }
}