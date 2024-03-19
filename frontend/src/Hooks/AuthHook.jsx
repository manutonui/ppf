import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const AuthHook = () => {
    const context = useContext(AuthContext)
    if ( !context ) console.log("useAuthContext must be used within AuthContextProvider")
    return context
}