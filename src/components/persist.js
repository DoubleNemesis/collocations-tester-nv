import React, { useState, useEffect, useContext } from "react"
import { UserContext, UserDispatchContext } from "../context/userProvider";

function Persist() {
    const userDetails = useContext(UserContext);
    const setUserDetails = useContext(UserDispatchContext)
    const loggedInUserJwt = localStorage.getItem('jwt');
    const loggedInUser = userDetails.username;
    const [isPersisted, setIsPersisted] = useState('not persisted') //should be bool


    // validate user and refresh token if needed / possible
    useEffect(() => {
        if (loggedInUser !== 'Guest') {
            let urlToRefresh = "https://tomsclassroom.com/student/?rest_route=/simple-jwt-login/v1/auth/refresh&JWT=" + loggedInUserJwt;
            (async ()=>{
                const serverResult = await fetch(urlToRefresh, {method: 'POST'})
                const JSONresult = await serverResult.json();
                if (JSONresult.success){
                    setUserDetails(prev => ({...prev, userJWT: JSONresult.data.jwt }))
                    setIsPersisted('The user persisted!!!')
                }
                else {
                    setIsPersisted('Nooooo!!!')
                }
            })()
            .catch(error=>{window.alert("Network Error. Please check your internet connection")})
        }
    }, [loggedInUser, loggedInUserJwt, setUserDetails])

    return (
        <div id="persist">
            {isPersisted}
        </div>
    )
}
export default Persist