import React, { useState } from 'react'
import { dbService } from '../fbase'

const Nweet = ({ nweetObject, isOwner }) => {
    const [editing, setediting] = useState(false)//에딧 버튼상태 토글
    const [newNweet, setnewNweet] = useState(nweetObject.text)

    const onDeleteClick = () => {//필요에 따라서 async await를 써도 됨(필수는 아님)
        const ok = window.confirm("Are you sure Delete this Nweet?")
        console.log(ok)
        if (ok) {
            //delete
            dbService.doc(`nweets/${nweetObject.id}`).delete()
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
