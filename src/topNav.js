import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { UserProvider, UserContext } from "./userProvider";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

function TopNav() {
    const userDetails = useContext(UserContext);
    let logInOut = (userDetails.isLoggedIn) ?  'logout' : 'login';
    let logInOutDisp = (userDetails.isLoggedIn) ?  'Logout' : 'Login';
    let registerAccount = (userDetails.isLoggedIn) ?  'Account' : 'Sign Up';
    let registerAccountNav = (userDetails.isLoggedIn) ?  'account' : 'register';

    return (
        <Navbar expand="lg">
            <Navbar.Brand href="/"><Link to="/" className="title">Tom's Classroom</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to={logInOut}>{logInOutDisp}</Link>
                <Link className="nav-link" to={registerAccountNav}>{registerAccount} </Link>
                <span className='user'> {userDetails.username}</span>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNav