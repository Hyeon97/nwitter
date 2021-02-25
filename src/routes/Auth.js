import React, { useState } from "react"
import { authService, firebaseInstance } from "../fbase"

//function component라고 함
//export default () => <span>Auth</span>

//이런식으로 적으면 다른데서 사용할때 자동으로 import 가능
const Auth = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [newAccount, setnewAccount] = useState(true)
    //에러처리
    const [error, seterror] = useState("")
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

    const toggleAccount = () => setnewAccount((prev) => !prev)
    const onSocialClick = async (e) => {
        const { target: { name } } = e
        let provider
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        }
        else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }
        //참고 https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#signinwithpopup
        const data = await authService.signInWithPopup(provider)
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
}


export default Auth