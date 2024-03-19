import "../Styles/Forms.css"
import { useState } from 'react'
import { LoginHook } from '../Hooks/LoginHook'
import Footer from '../Layout/Footer';

const Login = () => {
    const { login, isLoading, error } = LoginHook()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        await login(email, password)
    }


    return (
        <div className="loginPage">
            <div className="login-section">
                <form onSubmit={handleLogin} className="login-form">
                    <h3>Login</h3>
                    <hr width="1%"/>
                    <input onChange={e=>setEmail(e.target.value)} value={email} placeholder="E-Mail" className="form-control form-control-sm" /><br/>
                    <input onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" className="form-control form-control-sm" />
                    <hr width="0"/>
                    <input disabled={isLoading} type="submit" value="Proceed" className="btn btn-sm btn-primary" /><br/>
                    {error && <div className="alert alert-danger my-2">{error}</div>}
                </form>
            </div>
            <Footer/>
        </div>
    );
}
 
export default Login;