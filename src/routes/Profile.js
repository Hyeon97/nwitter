import React from "react"
import { useHistory } from "react-router-dom"
import { authService } from "../fbase"

//function component라고 함
//export default () => <span>Profile</span>

//이런식으로 적으면 다른데서 사용할때 자동으로 import 가능
const Profile = () => {
    const history = useHistory() //usehistory 사용 참고 https://reactrouter.com/web/api/Hooks/usehistory
    const onLogOutClick = () => {
        authService.signOut()
        history.push("/");

    }
    return (
        <>
            <button onClick={onLogOutClick}>Logout</button>
        </>
    )

}


export default Profile