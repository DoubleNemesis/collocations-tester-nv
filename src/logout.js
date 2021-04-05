import React, { useContext } from "react";
import { UserDispatchContext } from "./userProvider";
import { useHistory } from 'react-router-dom'

function Logout() {
    const history = useHistory();
    const setUserDetails = useContext(UserDispatchContext);

    function handleClick() {
        localStorage.clear()
        setUserDetails({
            username: "Guest",
            userId: '',
            userJWT: '',
            isLoggedIn: false,
            userData: {},
        })
        history.push('/')
    }

    return (
        <div id="otherPages">
            <p>Click here to sign out</p>
<button onClick={handleClick}>Sign out</button>
        </div>
        
    )
}


export default Logout