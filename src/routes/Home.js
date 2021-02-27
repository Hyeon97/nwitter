import React, { useEffect, useState } from "react"
import Nweet from "../components/Nweet"
import NweetFactory from "../components/NweetFactory"
import { dbService } from "../fbase"

//function component라고 함
//export default () => <span>Home</span>

//이런식으로 적으면 다른데서 사용할때 자동으로 import 가능
const Home = ({ userObject }) => {//로그인한 유저의 정보를 props로 받아옴으로써 누가 로그인을 했는지 알 수 있음
    //console.log(userObject)

    const [nweets, setnweets] = useState([])

    // 오래된 방법
    // const getNweets = async () => {
    //     //참고 https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference?authuser=0#get
    //     const dbnweets = await dbService.collection("nweets").get()
    //     dbnweets.forEach((document) => {
    //         //일반적으로 set을 쓰면 값을 전달하지만
    //         //함수를 전달할 때는 이러한 방법을 쓴다.
    //         //함수를 전달하면 리액트는 이전값으로 접근을 가능하게 도와준다
    //         //document.data()는 forEach를 돌리면서 가장 최근의 document값을 나타내고 ...prev는 바로 직전의 document값을 나타낸다
    //         //setnweets((prev) => [document.data(), ...prev])
    //         //이런식으로 객체를 만들어서 넣어주는 방법도 있다
    //         //...document.data()는
    //         const nweetObject = {
    //             ...document.data(),//spread attribute 기능
    //             id: document.id,
    //         }
    //         setnweets((prev) => [nweetObject, ...prev])
    //     })
    // }

    //컴포넌트가 마운트 되었을때 동작
    useEffect(() => {
        //getNweets()
        dbService.collection("nweets").onSnapshot(snapshot => {//이 방법이 re-render 되지 않기때문(속도가 상대적으로 더빠름)에 좀더 좋음
            //console.log(snapshot.docs)
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setnweets(nweetArray)//모든 불러오기 작업이 끝난후 값 업데이트
            //console.log(nweetArray)
        })

    }, [])



    return (
        <div className="container">
            <NweetFactory userObject={userObject} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) =>
                    <Nweet
                        key={nweet.id}
                        nweetObject={nweet}
                        isOwner={nweet.creatorId === userObject.uid}
                    />
                )}
            </div>
        </div>
    )
}
export default Home