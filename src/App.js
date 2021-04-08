import React from "react";
import { UserProvider } from "./context/userProvider";
import { WordProvider } from "./context/wordsProvider"
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./pages/register";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Home from "./pages/home";
import Game from "./pages/game";
import TopNav from "./nav/topNav";
import Footer from "./components/footer"
import Account from "./pages/account"
import Dashboard from "./pages/dashboard"

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
            <Route path="/dashboard">
            <Dashboard />
          </Route>
            <Route path="/game">
              {/* <div className="mainSection"> */}
              <Game/>
              {/* </div> */}
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
