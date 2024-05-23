import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ManagerAccess from './ManagerAccess';

function Login() {
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); // State to track login status

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/employee/api/login', {
            username: username
        })
            .then(function (response) {
                console.log(response.data.token);
                Cookies.set("auth", response.data.token);
                setLoggedIn(true); 
            })
            .catch(function (error) {
                console.log("There was an error!", error);
            });
    };


    if (loggedIn) {
        return <ManagerAccess />;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Login;
