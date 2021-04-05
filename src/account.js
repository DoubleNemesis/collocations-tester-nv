import React, { useContext, useState, useEffect } from "react"
import { UserContext, UserDispatchContext } from "./userProvider";
import { useHistory } from 'react-router-dom'

function Account(){
let history = useHistory()
const userDetails = useContext(UserContext)
const [emailToReset, setEmailToReset] = useState('')
const [codeToSend, setCodeToSend] = useState('')
const [message, setMessage] = useState('')
const [newPassword, setNewPassword] = useState('')
const [styleColor, setStyleColor] = useState('')
const [redirectMessage, setRedirectMessage] = useState('')
//const [code, setCode] = useState('')
const urlToFetch = 'https://tomsclassroom.com/student/wp-json/bdpwr/v1/reset-password';
const urlToSendCode = 'https://tomsclassroom.com/student/wp-json/bdpwr/v1/set-password';
let displayName = userDetails.username !== 'Guest' ? userDetails.username : '';
const messageStyle = {color: styleColor}

function handleChange(e){
    if (e.target.id == "email"){
        setEmailToReset(e.target.value)
    }
    else if (e.target.id == "code"){
        setCodeToSend(e.target.value)
    }
    else if (e.target.id == "password"){
        setNewPassword(e.target.value)
    }

}

function handleSubmitEmail(e){
    e.preventDefault();
    let formData = new FormData();
    formData.append('email', emailToReset);
     (async ()=>{
        //console.log(emailToReset);
        const serverResult = await fetch(urlToFetch, {
            method:'POST',
            body: formData,
        })
        const jsonResult = await serverResult.json()
        if (jsonResult.data.status == '200'){
            setStyleColor('limegreen')
            setMessage(jsonResult.message)
            document.getElementById('codeForm').style.display="inline"; 
            document.getElementById('emailForm').style.display="none"; 
        }
        else {
            setMessage(jsonResult.message)
            //console.log(jsonResult);
            setStyleColor('red')
        }
    } )()
 }

 function handleSubmitCode(e){
     e.preventDefault();
     let formDataCode = new FormData();
     formDataCode.append('email', emailToReset);
     formDataCode.append('code', codeToSend);
     formDataCode.append('password', newPassword);
     (async ()=>{
         const codeResult = await fetch(urlToSendCode, {
            method: 'POST',
            body: formDataCode,
         })
         const codeJson = await codeResult.json()
         if (codeJson.data.status == '200'){
            // console.log(codeJson);
            // console.log('succcess');
            setMessage(codeJson.message)
            setStyleColor('green')
            setRedirectMessage('Redirecting you to homepage in 2 seconds...')
            setTimeout(()=>{
                window.location.replace('https://tomsclassroom.com/react/#/')
            }, 2000)
            
         }
         else {
            // console.log(codeJson.message);
            // console.log('fail');
            setMessage(codeJson.message)
            setStyleColor('red')
         }
     } )()

 }


    return(
        <div id="otherPages">
            <h3>{displayName}</h3>
            <h4>Reset Your Password</h4>
            <p>Type your email address in the box below. We'll email you a security code.</p>
            {emailToReset}
    <div style={messageStyle}>{message} {redirectMessage}</div>
            <form onSubmit={handleSubmitEmail} id="emailForm">
                <div className="form-group">
                    <label htmlFor="email">Email
                        <input type="email" className="form-control" name="email" id="email" value={emailToReset} onChange={handleChange}>
                        </input>
                    </label>
                </div>
                <div className="form-group">
                    <input type="submit" value="Request Code"></input>
                </div>
            </form>
            <form onSubmit={handleSubmitCode} id="codeForm">
                <div className="form-group">
                    <label htmlFor="code">Code
                        <input type="number" className="form-control" name="code" id="code" value={codeToSend} onChange={handleChange}></input>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New password
                    <input type="password" className="form-control" name="password" id="password" value={newPassword} onChange={handleChange}>
                    </input>
                    </label>
                </div>
                <div className="form-group">
                    <input type="submit" value="Change Password"></input>
                </div>
            </form>
        </div>
    )

}

export default Account