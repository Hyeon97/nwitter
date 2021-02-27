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
      }
      setinit(true)
    })
  }, [])

  return (
    <div>
      {init ? <AppRouter isLoggenIn={Boolean(userObject)} userObject={userObject} /> : "Initializing...."}
      {/* <footer>&copy; Nwitter {new Date().getFullYear()}</footer> */}
    </div>
  );
}

export default App;
