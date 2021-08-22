import React, { useContext } from "react";
import { UserDispatchContext } from "../context/userProvider";
import { useHistory } from 'react-router-dom'
import PageTitle from '../components/PageTitle'

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
        <>
            <PageTitle title="log out" />
            <div id="otherPages">
                <button onClick={handleClick}>Sign out</button>
            </div>
        </>
    )
}


export default Logout