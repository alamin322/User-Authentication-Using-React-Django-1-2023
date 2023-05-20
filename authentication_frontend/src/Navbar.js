import React, { useState } from "react";
import axios from "axios";
// import jwt_decode from "jwt_decode";
// import jwt from 'jsonwebtoken';

const Navbar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [username_login, setUsername_login] = useState('');
    const [password_login, setPassword_login] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event)
        axios.post("http://127.0.0.1:8000/api/signup/", { username, password }).then((response) => {
            console.log("All response: ", response)
            if (response.status === 200) {
                console.log("Successfully registered")
            } else if (response.status === 409) {
                console.log("Username already exists");
            } else {
                console.log("Something went wrong");
            }
        }).catch((error) => {
            console.error("error: ", error);
        })
    };


    const handleSubmit_login = (event) => {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/api/signin/", { username_login, password_login }).then((response) => {
            console.log("All response: ", response)
            if (response.status === 200) {
                const { access_token, refresh_token } = response.data;
                console.log(access_token, refresh_token)
                localStorage.setItem("access_token", access_token);
                localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem("username_login", username_login);

                window.location.reload(); // Reload the page

                // const decodedToken = jwt_decode(access_token);
                // const decode_token = jwt.decode(access_token)

                // console.log(decodedToken);
            } else {
                console.log("Failed Login");
            }
        }).catch((error) => {
            console.log("error occurred");
            console.error("error: ", error);
        });
    };

    const handleLogout = (event) => {
        event.preventDefault();
        const refresh_token = localStorage.getItem('refresh_token');
        axios.post("http://127.0.0.1:8000/api/signout/", { refresh_token }).then((response) => {
            if (response.status === 200) {
                console.log("Successfully logged out");
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.reload(); // Reload the page
            } else {
                console.log("Logout failed: ", response.status);
            }
        }).catch((error) => {
            console.log("Logout failed: ", error);
        });
    };

    // Check if user is logged in
    const isLoggedIn = !!localStorage.getItem('access_token');
    console.log("user is login or not: ", isLoggedIn);



    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Others</a>
                            </li>

                        </ul>
                        {/* <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ marginRight: '8px' }}>Signup</button>
                        <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">LogIn</button>
                        <button type="submit" onClick={handleLogout} className="btn btn-primary" >LogOut</button> */}


                        {isLoggedIn ? (
                            <button type="button" onClick={(event) => {handleLogout(event)}} className="btn btn-primary">Logout</button>
                        ) : (
                            <>
                                <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ marginRight: '8px' }}>Signup</button>
                                <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">Login</button>
                            </>
                        )}


                    </div>
                </div>
            </nav>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Registration Form</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form onSubmit={handleSubmit} method="post">
                                <div className="mb-3">
                                    <label htmlFor="exampleusername" className="form-label">User Name</label>
                                    <input type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} className="form-control" id="exampleusername" aria-describedby="usernamehelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} className="form-control" id="exampleInputPassword1" />
                                </div>

                                <button type="submit" className="btn btn-primary btn-sm" data-bs-dismiss="modal">Submit</button>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel2">LogIn Form</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method="post" onSubmit={handleSubmit_login}>
                                <div className="mb-3">
                                    <label htmlFor="exampleusername2" className="form-label">User Name</label>
                                    <input type="text" name="username" value={username_login} onChange={(event) => { setUsername_login(event.target.value) }} className="form-control" id="exampleusername2" aria-describedby="usernamehelp2" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                                    <input type="password" name="password" value={password_login} onChange={(event) => { setPassword_login(event.target.value) }} className="form-control" id="exampleInputPassword2" />
                                </div>

                                <button type="submit" className="btn btn-primary btn-sm" data-bs-dismiss="modal">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default Navbar;
