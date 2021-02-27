import React from "react"
import AuthForm from "../components/AuthForm"
import { authService, firebaseInstance } from "../fbase"

//CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
                <button onClick={onSocialClick} name="github" className="authBtn">Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    )
}


export default Auth