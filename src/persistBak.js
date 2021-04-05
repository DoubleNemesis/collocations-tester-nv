import React, { useState, useEffect, useContext } from "react"
import { UserContext, UserDispatchContext } from "./userProvider";

function Persist() {
    const userDetails = useContext(UserContext);
    const setUserDetails = useContext(UserDispatchContext)
    const loggedInUserJwt = localStorage.getItem('jwt');
    const loggedInUser = userDetails.username;
    const [coursesToShow, setCoursesToShow] = useState('')
    const [isPersisted, setIsPersisted] = useState('not persisted')
    let coursesData = []


    // validate user and refresh token if needed / possible
    useEffect(() => {
        if (loggedInUser) {
            console.log(loggedInUserJwt);
            let urlToValidate = 'https://tomsclassroom.com/student/?rest_route=/simple-jwt-login/v1/auth/validate&jwt=' + loggedInUserJwt;
            console.log(urlToValidate)
            fetch(urlToValidate, {
                method: 'GET',
            })
            .then((response) => {
                let ponse = response.text()
                console.log(ponse);
                return ponse;
            })
            .then(function (post) {
                    let authOutcome = JSON.parse(post)
                    if (authOutcome.data.jwt) {
                        console.log('user is authenticated already')
                        setIsPersisted('user persisted 1')
                    }
                    else {
                        let urlToRefresh = "https://tomsclassroom.com/student/?rest_route=/simple-jwt-login/v1/auth/refresh&JWT=" + loggedInUserJwt;
                        fetch(urlToRefresh, {
                            method: 'POST',
                        })
                            .then((response) => {
                                return response.text()
                            })
                            .then(function (post) {
                                let refreshOutcome = JSON.parse(post)
                                if (refreshOutcome.data.jwt) {
                                    const jwtStringToSave = JSON.stringify(authOutcome.data.jwt[0].token)
                                    console.log('new jwt assigned');
                                    setIsPersisted('user persisted 2')
                                    setUserDetails(prev => ({ ...prev, userJWT: refreshOutcome.data.jwt }))
                                    localStorage.setItem('jwt', jwtStringToSave)
                                }
                                else {
                                    console.log('You need to login again')
                                    setIsPersisted('user persist failed')
                                    // save any progress to localstorage and update on login via useeffect
                                    // display error to user here
                                    // clear username, save local data to something else?
                                }
                            })
                    }
                })
                .catch(error=>{window.alert("this is an error")})
        }
    }, [])

    return (
        <div id="otherPages">
            {isPersisted}
        </div>
    )
}
export default Persist