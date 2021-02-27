import React, { useState } from 'react'
import { dbService, storageService } from '../fbase'

const Nweet = ({ nweetObject, isOwner }) => {

    const [editing, setediting] = useState(false)//에딧 버튼상태 토글
    const [newNweet, setnewNweet] = useState(nweetObject.text)

    const onDeleteClick = async () => {//필요에 따라서 async await를 써도 됨(필수는 아님)
        const ok = window.confirm("Are you sure Delete this Nweet?")
        //console.log(ok)
        if (ok) {
            //delete
            //트윗(문자) 지우기
            await dbService.doc(`nweets/${nweetObject.id}`).delete()
            //해당트윗에 첨부된 사진 지우기(사진이 존재한다면)
            await storageService.refFromURL(nweetObject.attachmentUrl).delete()
        }
    }
    const toggleEditing = () => setediting((prev) => !prev)

    const onSubmit = async (e) => {
        e.preventDefault()
        //console.log(nweetObject, newNweet)
        await dbService.doc(`nweets/${nweetObject.id}`).update({
            text: newNweet,
        })
        setediting(false)

    }

    const onChange = (e) => {
        const { target: { value } } = e
        setnewNweet(value)

    }

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your nweet"
                            value={newNweet}
                            required
                            onChange={onChange}
                        />
                        <input
                            type="submit"
                            value="Update Nweet"
                        />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                    <>
                        <h4>{nweetObject.text}</h4>
                        {nweetObject.attachmentUrl && <img src={nweetObject.attachmentUrl} width="50px" height="50px" />}
                        {
                            isOwner &&
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Edit Nweet</button>
                            </>
                        }
                    </>
                )
            }

        </div >
    )
}

export default Nweet
