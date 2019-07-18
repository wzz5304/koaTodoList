import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from '../views/home/index.jsx'
import Topics from '../views/topic/index.jsx'
import loginPage from '../views/login/index.jsx'

const RouteViews = () => {
    return(
        <Router>
            <div>
                {/* <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
                <hr /> */}
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={loginPage} />
                <Route path="/topics" component={Topics} />
            </div>
        </Router>
    )
}

export default RouteViews;