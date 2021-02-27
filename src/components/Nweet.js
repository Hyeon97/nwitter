import React, { useState } from 'react'
import { dbService, storageService } from '../fbase'

//CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input
                            type="text"
                            placeholder="Edit your nweet"
                            value={newNweet}
                            required
                            autoFocus
                            onChange={onChange}
                            className="formInput"
                        />
                        <input
                            type="submit"
                            value="Update Nweet"
                        />
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
          </span>
                </>
            ) : (
                    <>
                        <h4>{nweetObject.text}</h4>
                        {nweetObject.attachmentUrl && <img src={nweetObject.attachmentUrl} />}
                        {
                            isOwner &&
                            (<div class="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>)
                        }
                    </>
                )
            }

        </div >
    )
}

export default Nweet
