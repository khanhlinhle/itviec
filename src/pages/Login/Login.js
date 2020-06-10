import React, { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { Button, Tabs, Tab } from "react-bootstrap";
import CreateAccount from './CreateAccount';

export default function Login(props) {
    let [userEmail, setUserEmail] = useState("");
    const passwordRef = useRef("");
    const dispatch = useDispatch();
    let history = useHistory();
    const login = (e) => {
        e.preventDefault();
        let user = { email: userEmail, password: passwordRef.current.value };
        dispatch({ type: "LOGIN", payload: user });
        history.goBack();
    };

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    return (
        <div className="wrapper">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="create-account-tab">
                <Tab eventKey="createAccount" title="Create Account">
                    <CreateAccount />
                </Tab>
                <Tab eventKey="login" title="Log in">
                    <div className="form-wrapper">
                        <div className="create-account-text">Log in</div>
                        <form noValidate>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className=""
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    noValidate
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="text"
                                    className=""
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    noValidate
                                    ref={passwordRef}
                                />
                            </div>
                            <div className="createAccount">
                                <Button variant="outline-success" type="submit" onClick={login}>Log in</Button>
                            </div>
                        </form>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
