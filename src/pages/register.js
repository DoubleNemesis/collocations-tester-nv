import React, { useContext, useState, useEffect } from "react"
import { UserContext, UserDispatchContext } from "../context/userProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import PageTitle from '../components/PageTitle'

function Register() {
    const setUserDetails = useContext(UserDispatchContext);
    const userDetails = useContext(UserContext);
    const [loginDetails, setLoginDetails] = useState({})
    const [regErr, setRegErr] = useState('')
    const [jwt, setJwt] = useState('')
    const [urlToLogin, setUrlToLogin] = useState('')
    const [isLoading, setIsLoading] = useState('');

    function handleFormSubmit(e) {
        e.preventDefault()
        setIsLoading('Setting up your account...')
        let formData = new FormData()
        formData.append('email', loginDetails.email)
        formData.append('password', loginDetails.password)
        formData.append('user_login', loginDetails.user_login)
        fetch('https://tomsclassroom.com/student/ajaxphp-register.php', {
            method: 'POST',
            body: formData
        }).then(function (response) {
            return response.text()
        }).then(function (post) {
            if (post.length > 1) {
                fetch('https://tomsclassroom.com/student/?rest_route=/simple-jwt-login/v1/auth&username=' + loginDetails.user_login + '&password=' + loginDetails.password, {
                    method: 'POST',
                })
                    .then(function (response) {
                        return response.text()
                    })
                    .then(function (post) {
                        if (JSON.parse(post).data.jwt) {
                            let newJwt = JSON.parse(post).data.jwt;
                            setJwt(newJwt)
                            // console.log('redirect here')
                            // console.log(newJwt)
                            document.getElementById('loadingMessages').style.display="inline";
                        }
                        else {
                            console.log('Something failed')
                        }
                    })
            }
            else {
                setRegErr('Sorry, registration failed. It could be that you have already registered or that the username you have chosed has already been taken')
                document.getElementById('loadingMessages').style.display="none";
                // console.log(post)
            }
        })
    }

    useEffect(() => {
        if (jwt) {
            if (jwt.length > 1) {
                setUrlToLogin('https://tomsclassroom.com/student/ajaxphp-login.php?jwt1=' + jwt)
            }
        }
        else { 
            console.log('login failed')
            

    }
    }, [jwt])

    useEffect(() => {
        if (urlToLogin.length > 1) {
            fetch(urlToLogin, {
                method: 'GET',
            }
            )
                .then(function (response) {
                    if (response.status == 200) {
                        setUserDetails({
                            username: loginDetails.user_login,
                            userJWT: jwt
                        })
                        window.location.replace('https://tomsclassroom.com/collocations-tester/#/')
                    }
                    return response.text()
                })
                .then(function (post) {
                })
        }
    }, [urlToLogin])

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginDetails(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
        <PageTitle title="sign up"/>
        <div className="profile" id="otherPages">
            <h2>Sign Up</h2>
            <form onSubmit={handleFormSubmit} >

                <div className="form-group">
                    <label htmlFor="user_login">Username: <input type="text" name="user_login" className="form-control" onChange={handleChange} value={loginDetails.user_login}>
                    </input></label>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email: <input type="text" name="email" className="form-control" onChange={handleChange} value={loginDetails.email}>
                    </input></label>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password: <input type="password" name="password" className="form-control" onChange={handleChange} value={loginDetails.password}>
                    </input></label>
                </div>
                <div className="form-group">
                    <input type="submit" />
                </div>
            </form>
            {regErr}
            <div id="loadingMessages">
            {isLoading}
            {loginDetails.user_login}
            {loginDetails.email}
            </div>

        </div>
        </>
    )
}
export default Register