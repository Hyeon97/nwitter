import React, { useState } from 'react'
import { authService } from '../fbase'

const AuthForm = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [newAccount, setnewAccount] = useState(true)
    //에러처리
    const [error, seterror] = useState("")
    const toggleAccount = () => setnewAccount((prev) => !prev)
    const onChange = (e) => {
        const { target: { name, value } } = e
        if (name === "email") {
            setemail(value)
        }
        else {
            setpassword(value)
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            let data
            if (newAccount) {//create 
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else {//log in
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log(data)
        } catch (error) {
            seterror(error.message)
        }

    }

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} className="authInput" />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput" />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} className="authInput authSubmit" />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    )
}

export default AuthForm
