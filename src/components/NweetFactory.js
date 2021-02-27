import React, { useState } from 'react'
import { dbService, storageService } from '../fbase'
import { v4 as uuidv4 } from "uuid"

const NweetFactory = ({ userObject }) => {

    const [attachment, setattachment] = useState("")
    const [nweet, setnweet] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        let attachmentUrl = ""
        if (attachment !== "") {
            //참고 https://firebase.google.com/docs/reference/js/firebase.storage.Reference?authuser=0#child
            //collection이랑 비슷하게 동작
            const attachmentRef = storageService
                .ref()
                .child(`${userObject.uid}/${uuidv4()}`)
            //참고 https://firebase.google.com/docs/reference/js/firebase.storage.Reference?authuser=0#putstring
            const response = await attachmentRef.putString(attachment, "data_url")
            attachmentUrl = await response.ref.getDownloadURL()
        }
        const nweetObject = {
            text: nweet,
            createAt: Date.now(),
            creatorId: userObject.uid,
            attachmentUrl,
        }
        //참고 https://firebase.google.com/docs/reference/js/firebase.firestore.Firestore?authuser=0#collection
        await dbService.collection("nweets").add(nweetObject)
        setnweet("")
        setattachment("")
    }
    const onChange = (e) => {
        // e.target.value 이거랑 같음 es6문법, event 안의 target안에 있는 value를 달라와 같은 말
        const { target: { value } } = e
        setnweet(value)
    }


    //미리보기 화면 사진 한장 만들기
    const onFileChange = (e) => {
        const { target: { files } } = e
        const theFile = files[0]
        const reader = new FileReader()
        reader.onloadend = (finishedEvent) => {//이벤트 리스너
            const { currentTarget: { result } } = finishedEvent
            setattachment(result)
            //console.log(finishedEvent)
        }
        reader.readAsDataURL(theFile)
    }

    const onClearAttachment = () => {
        setattachment(null)
    }
    return (
        <form onSubmit={onSubmit}>
            <input
                onChange={onChange}
                value={nweet}
                type="text"
                placeholder="what`s on your mind?"
                maxLength={120}
            />
            <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
            />
            <input type="submit" value="Nweet" />
            {attachment &&
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            }

        </form>
    )
}

export default NweetFactory
