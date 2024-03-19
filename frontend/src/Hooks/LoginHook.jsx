import { useState } from "react";
import { AuthHook } from "./AuthHook";

export const LoginHook = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = AuthHook()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'LOGIN', payload: json}) // update auth context
            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}