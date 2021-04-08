import React, { useContext } from "react";
import { Navbar, Nav} from 'react-bootstrap';
import { UserProvider, UserContext } from "../context/userProvider";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

function TopNav() {
    const userDetails = useContext(UserContext);
    let logInOut = (userDetails.isLoggedIn) ?  'logout' : 'login';
    let logInOutDisp = (userDetails.isLoggedIn) ?  'logout' : 'login';
    let registerAccount = (userDetails.isLoggedIn) ?  'account' : 'sign Up';
    let registerAccountNav = (userDetails.isLoggedIn) ?  'account' : 'register';

    return (
        <Navbar expand="lg">
            <Navbar.Brand><Link to="/" className="title">Tom's Classroom</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Link className="nav-link" to="/">home</Link>
                <Link className="nav-link" to="/game">game</Link>
                <Link className="nav-link" to={logInOut}>{logInOutDisp}</Link>
                <Link className="nav-link" to={registerAccountNav}>{registerAccount} </Link>
                {userDetails.isLoggedIn ? <Link className="nav-link" to="/dashboard">dashboard</Link> : null}
                <span className='user'> {userDetails.username}</span>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNav