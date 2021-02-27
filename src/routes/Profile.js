import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { authService } from "../fbase"

//function component라고 함
//export default () => <span>Profile</span>

//이런식으로 적으면 다른데서 사용할때 자동으로 import 가능
const Profile = ({ refreshUser, userObject }) => {

    const [newDisplayName, setnewDisplayName] = useState(userObject.displayName)

    const history = useHistory() //usehistory 사용 참고 https://reactrouter.com/web/api/Hooks/usehistory
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");

    }
    // const getMyNweets = async () => {
    //     //기본적인 필터링 방법
    //     const nweets = await dbService
    //         .collection("nweets")
    //         .where("creatorId", "==", userObject.uid)
    //         .orderBy("createAt")//no sql이라 그냥 쓰면 오류발생 사용자가 직접 들어가서 설정해줘야함
    //         .get()
    //     console.log(nweets.docs.map(doc => doc.data()))
    // }

    // useEffect(() => {
    //     getMyNweets()
    // }, [])
    const onChange = (e) => {
        const { target: { value } } = e
        setnewDisplayName(value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (userObject.displayName !== newDisplayName) {
            //참고 https://firebase.google.com/docs/reference/js/firebase.User#updateprofile
            //console.log(userObject.updateProfile)
            await userObject.updateProfile({//updateProfile사용시 firebase 쪽에 있는 user를 새로고침함
                displayName: newDisplayName,
            })
            refreshUser()
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Logout</button>
        </>
    )

}


export default Profile