import React from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Navigation from "./Navigation"

import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Profile from "../routes/Profile"



const AppRouter = ({ refreshUser, isLoggenIn, userObject }) => {

    return (
        <Router>
            {isLoggenIn && <Navigation userObject={userObject} />}
            <Switch>
                {
                    isLoggenIn ? (
                        <>
                            <Route exact path="/">
                                <Home userObject={userObject} />
                            </Route>
                            <Route exact path="/profile">
                                <Profile userObject={userObject} refreshUser={refreshUser} />
                            </Route>
                        </>
                    ) : (
                            <Route exact path="/">
                                <Auth />
                            </Route>
                        )}
            </Switch>
        </Router>
    )

}

export default AppRouter