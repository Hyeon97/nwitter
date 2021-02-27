import React, { useState, useEffect } from 'react'
import { authService } from "../fbase"

import AppRouter from './Router'


function App() {
  const [init, setinit] = useState(false)
  //const [isLoggenIn, setisLoggenIn] = useState(false)//authService.currentUser >> 값이있으면 user를 없으면 null을 리턴
  const [userObject, setuserObject] = useState(null)

  useEffect(() => {

    authService.onAuthStateChanged((user) => {//로그인하면 이 함수가 호출됨
      if (user) {//만약 유저값이 바뀌면
        //setisLoggenIn(true)
        setuserObject(user)//바뀐유저값을 저장
        //프로필 이름 바꿨을때 실시간으로 re-render하는 방법 1
        setuserObject({//전체다 저장하지 않고 우리가 쓰는것만 따로 추려서 저장
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        })
        //프로필 이름 바꿨을때 실시간으로 re-render하는 방법 2 (비선호)
        //setuserObject(user)
      } else {
        setuserObject(null)
      }
      setinit(true)
    })
  }, [])

  const refreshUser = () => {

    const user = authService.currentUser
    //프로필 이름 바꿨을때 실시간으로 re-render하는 방법 1
    setuserObject({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    })
    //프로필 이름 바꿨을때 실시간으로 re-render하는 방법 2 (비선호)
    //setuserObject(Object.assign({}, user))//{}는 빈 오브젝트
  }

  return (
    <div>
      {init ? <AppRouter refreshUser={refreshUser} isLoggenIn={Boolean(userObject)} userObject={userObject} /> : "Initializing...."}
      {/* <footer>&copy; Nwitter {new Date().getFullYear()}</footer> */}
    </div>
  );
}

export default App;
