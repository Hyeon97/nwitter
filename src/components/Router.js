import React from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Navigation from "./Navigation"

import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Profile from "../routes/Profile"



const AppRouter = ({ isLoggenIn, userObject }) => {

    return (
        <Router>
            {isLoggenIn && <Navigation />}
            <Switch>
                {
                    isLoggenIn ? (
                        <>
                            <Route exact path="/">
                                <Home userObject={userObject} />
                            </Route>
                            <Route exact path="/profile">
                                <Profile />
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