import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);
let loggedInUserJWT ='';

function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState({
    username: "Guest",
    isLoggedIn: false,
    userId: '',
    userJWT: '',
    userData: {} 
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    const loggedInUserJWT = localStorage.getItem('jwt')
    const loggedInUserId = localStorage.getItem('id')
    const loggedInUserData = localStorage.getItem('userData')

    if (loggedInUserJWT) {
      setUserDetails({
        username: loggedInUser,
        userJWT: loggedInUserJWT,
        userData: loggedInUserData,
        isLoggedIn: true,
      })
    }
  }, [])

  useEffect(() => { //stop rerender here?
    if (userDetails.userJWT.length > 2) {
      let newJwt = userDetails.userJWT;
      let base64Url = newJwt.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      let newUserId = JSON.parse(jsonPayload).id
      if (userDetails.userId !== newUserId) {
        setUserDetails(prev => ({ ...prev, userId: newUserId }))
        setUserDetails(prev => ({ ...prev, isLoggedIn: true }))
        localStorage.setItem('user', userDetails.username)
        localStorage.setItem('jwt', userDetails.userJWT) //check how to do this...string?
        localStorage.setItem('id', newUserId)
        localStorage.setItem('userData', userDetails.userData)
      }
    }
  }, [userDetails])

  return (
    <UserContext.Provider value={userDetails}>
      <UserDispatchContext.Provider value={setUserDetails}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };
