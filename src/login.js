import React, { useContext, useState, useEffect } from "react";
import { UserDispatchContext } from "./userProvider";

function Login() {
  const setUserDetails = useContext(UserDispatchContext);
  const [urlToLogin, setUrlToLogin] = useState('')
  const [jwt, setJwt] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [isLoading, setIsLoading] = useState('');
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
    userJWT: ''
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginDetails(prev => ({ ...prev, [name]: value }))
  }
  function handleSubmit(e) {
    e.preventDefault();
    let urlToAuth = 'https://tomsclassroom.com/student/?rest_route=/simple-jwt-login/v1/auth&username=' + loginDetails.username + '&password=' + loginDetails.password;
    let newJwt = ''
    document.getElementById('loginLoading').style.display="inline";
    document.getElementById('loginError').style.display="none";
    setIsLoading('Getting your data...')
    fetch(urlToAuth, {
      method: 'POST',
    })
      .then(function (response) {
        return response.text()
      })
      .then(function (post) {
        newJwt = JSON.parse(post).data.jwt;
        setJwt(newJwt)
      })
  }

  useEffect(() => {
    if (jwt) {
      if (jwt.length > 1) {
        setUrlToLogin('https://tomsclassroom.com/student/ajaxphp-login.php?jwt1=' + jwt)
      }
    }
    else {
      if (loginDetails.username.length > 1){
        // console.log('login failed')
        setLoginErr('Login failed. Please check your details and try again.')
        document.getElementById('loginError').style.display="inline";
        document.getElementById('loginLoading').style.display="none";
      }

        }
  }, [jwt])

  useEffect(() => {
    if (urlToLogin.length > 1) {
      fetch(urlToLogin, {
        method: 'GET',
      }
      )
        .then(function (response) {
          if (response.status == 200) { //check this 200 thing
            let newJwt = jwt;
            let base64Url = newJwt.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            let newUserId = JSON.parse(jsonPayload).id
            let urlToFetchUserDetails = 'https://tomsclassroom.com/student/ajaxphp-dashboard.php?userid=' + newUserId + '&jwt=' + jwt;
            fetch(urlToFetchUserDetails, {
              method: "GET",
            }).then(function (response) {
              if (response) {
                return response.json();
              }
              else {
                return false;
              }
            }).then(function (post) {
              let newUserData = '';
              if (post[0]['user_id_data']) {
                newUserData = post[0]['user_id_data'];
              }
              localStorage.setItem('user', loginDetails.username)
              localStorage.setItem('userData', newUserData)
              localStorage.setItem('jwt', jwt)
              setUserDetails({
                username: loginDetails.username,
                userId: newUserId,
                userJWT: jwt,
                userData: newUserData,
                isLoggedIn: true,
              })
              window.location.replace('https://tomsclassroom.com/react/#')
              return response.text()
            })
              .then(function (post) {
              })
          }
        }
        )
    }
  }, [urlToLogin])

  return (
    <div className="profile" id="otherPages">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label htmlFor="username">Username <input type="text" className="form-control" name="username" id="username" value={loginDetails.username} onChange={handleChange}>
        </input></label>
      </div>
        
      <div className="form-group">
        <label htmlFor="password">Password <input type="password" className="form-control" name="password" id="password" value={loginDetails.password} onChange={handleChange}>
        </input></label>
      </div>
          
      <div className="form-group">
        <input type="submit"  value="Log in" />
      </div>
      </form>
     <div id="loginLoading">{isLoading}</div> 
     <div id="loginError">{loginErr}</div>
      
      <p><a href="./#/account">Password Reset</a></p>
    </div>
  );
}

export default Login