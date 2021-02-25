import React, { useState, useEffect } from 'react'
import { authService } from "../fbase"

import AppRouter from './Router'


function App() {
  const [init, setinit] = useState(false)
  const [isLoggenIn, setisLoggenIn] = useState(false)//authService.currentUser >> 값이있으면 user를 없으면 null을 리턴
  useEffect(() => {

    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLoggenIn(true)
      }
      else {
        setisLoggenIn(false)
      }
      setinit(true)
    })
  }, [])

  return (
    <div>
      {init ? <AppRouter isLoggenIn={isLoggenIn} /> : "Initializing...."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
