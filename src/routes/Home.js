import React, { useEffect, useState } from "react"
import { dbService } from "../fbase"

//function component라고 함
//export default () => <span>Home</span>

//이런식으로 적으면 다른데서 사용할때 자동으로 import 가능
const Home = () => {
    const [nweet, setnweet] = useState("")
    const [nweets, setnweets] = useState([])

    const getNweets = async () => {
        //참고 https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference?authuser=0#get
        const dbnweets = await dbService.collection("nweets").get()
        dbnweets.forEach((document) => {
            //일반적으로 set을 쓰면 값을 전달하지만
            //함수를 전달할 때는 이러한 방법을 쓴다.
            //함수를 전달하면 리액트는 이전값으로 접근을 가능하게 도와준다
            //document.data()는 forEach를 돌리면서 가장 최근의 document값을 나타내고 ...prev는 바로 직전의 document값을 나타낸다
            //setnweets((prev) => [document.data(), ...prev])
            //이런식으로 객체를 만들어서 넣어주는 방법도 있다
            //...document.data()는
            const nweetObject = {
                ...document.data(),//spread attribute 기능
                id: document.id,
            }
            setnweets((prev) => [nweetObject, ...prev])
        })

    }

    //컴포넌트가 마운트 되었을때 동작
    useEffect(() => {
        getNweets()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        //참고 https://firebase.google.com/docs/reference/js/firebase.firestore.Firestore?authuser=0#collection
        await dbService.collection("nweets").add({
            nweet,
            createAt: Date.now()
        })
        setnweet("")
    }
    const onChange = (e) => {
        // e.target.value 이거랑 같음 es6문법, event 안의 target안에 있는 value를 달라와 같은 말
        const { target: { value } } = e
        setnweet(value)
    }

    console.log(nweets)
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={nweet} type="text" placeholder="what`s on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) =>
                    <div key={nweet.id} >
                        <h4>{nweet.nweet}</h4>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Home