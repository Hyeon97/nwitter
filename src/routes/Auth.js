import React from "react"
import AuthForm from "../components/AuthForm"
import { authService, firebaseInstance } from "../fbase"

//function component라고 함
//export default () => <span>Auth</span>

//이런식으로 적으면 다른데서 사용할때 자동으로 import 가능
const Auth = () => {
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
        await authService.signInWithPopup(provider)
    }

    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
}


export default Auth