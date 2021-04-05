import React from "react";
import { UserProvider } from "./userProvider";
import { WordProvider } from "./wordsProvider"
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./register";
import Login from "./login";
import Logout from "./logout";
import Home from "./home";
import Game from "./game";
import TopNav from "./topNav";
import Footer from "./footer"
import HomePageBlock from "./homePageBlock"
import Account from "./account"

function Main() {

  return (
    <div className="mainContent">
     <Router> 
      <UserProvider>
        <TopNav />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout/>
          </Route>
          <WordProvider>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/game">
              <div className="mainSection">

              </div>
            </Route>
         </WordProvider>
        </Switch>
       </UserProvider>
      </Router>
     
      <Footer/>
    </div>
  );
}

export default function App() {
  return <Main />;
}
