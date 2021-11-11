import React, {useState, useEffect} from 'react'
import APIService from '../APIService';
import {useCookies} from 'react-cookie';

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [errMsg, setErrMsg] = useState('')
    // the state to control which should be render (lonin/register)
    const [isLogin, setLogin] = useState(true)

    // if there is any valid token, switch to MainPage component
    useEffect(() => {
        if(token['mytoken']) {
            props.history.push("/posts");
        }
    }, [token])

    const loginBtn = () => {
        // check if this is the valid username in database
        APIService.LoginUser({username, password})
        .then(resp => {
            if (resp.token) {
                localStorage.setItem('username', username);
                setErrMsg('');
                setToken('mytoken',resp.token);
            } else{
                setErrMsg('User Name Not Found!');
            }
        }) // store the response token into 'mytoken' in cookies
    };

    const RegisterBtn = () => {
        // add new username and password into database
        APIService.RegisterUser({username, password})
        .then(() =>  loginBtn()) // after the registeration, login as new user
        .catch(error =>console.log(error))
    };

    return ( 
        <div className="container-fluid">
            {
                isLogin ? 
                <h1 className="mt-3">Login Page</h1>: 
                <h1 className="mt-3">Register Page</h1>
            }
            

            <div className = "my-3">
                <label htmlFor = "username" className = "form-label">Username</label>
                <input type = "text" className = "form-control" id="username" placeholder = "Please Enter Username"
                value = {username} onChange = {e => setUsername(e.target.value)}
                />
            </div>

            <div className = "mb-3">
                <label htmlFor = "password" className = "form-label">Password</label>
                <input type = "password" className = "form-control" id="password" placeholder = "Please Enter Password"
                value = {password} onChange = {e => setPassword(e.target.value)}
                />
            </div>

            {
                isLogin ?  
                <button onClick = {loginBtn} className = "btn btn-primary">Login</button>:  
                <button onClick = {RegisterBtn} className = "btn btn-primary">Register</button>
            }

            {errMsg && <h3 className="text-danger">{errMsg}</h3>}
           
            <div className = "my-3">
                {
                    isLogin ? 
                    <h5>If You Don't Have Account, You Can <button className = "btn btn-primary mr-2" onClick = {() => setLogin(false)} >Register</button>Here</h5>:  
                    <h5>If You Have Account, You Can <button className = "btn btn-primary mr-2" onClick = {() => setLogin(true)} >Login</button>Here</h5>
                }
            </div>

            <div className="text-white mt-5">
                <p>Try with this user name if you don't want to register: Guest, password: 1234</p>
                <p className="text-warning">It will cause a short delay to wake up the web dyno in Heroku for the first request</p>
            </div>
        </div>
     );
}

export default Login;