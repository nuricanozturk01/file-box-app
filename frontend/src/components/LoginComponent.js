import React, {useContext, useState} from "react";
import filebox from "../images/filebox_logo.png"
import ValidateUser from "../service/LoginService";
import {Link, Navigate} from "react-router-dom";
import {Context} from "../Context/ContextProvider";
import {Status} from "../Status";
import {ViewStatus} from "../ViewStatus";
import {FindRootFolderByUserId} from "../service/FindFoldersByUserIdAndFolderId";



const LoginComponent = () =>
{

    const [response, setResponse] = useState(null)
    const context = useContext(Context)
    const [userInput, setUserInput] = useState({
        username: null, // initial state
        password: null, // initial state
    })

    async function HandleLoginButton()
    {
        setUserInput({
            ...userInput,
            username: userInput.username,
            password: userInput.password,
        })

        const response = await ValidateUser(userInput);
        if (!response.success)
            context.setLoginStatus(Status.Fail)
        else
        {
            localStorage.setItem("token", response.token)
            localStorage.setItem('user_id', response.user_id)
            localStorage.setItem('username', response.username)
            const root = await FindRootFolderByUserId();

            context.setRootFolder(root)

            // token
            setResponse(response)
            context.setLoginStatus(Status.Success)
            context.setShowAlert(true)
        }
    }

    function HandlePassword(event)
    {
        setUserInput({
            ...userInput,
            password: event.target.value,
        })
    }

    function HandleUsername(event)
    {
        setUserInput({
            ...userInput,
            username: event.target.value,
        })
    }

    const ProtectForm = (event) =>
    {
        event.preventDefault()
    };


    return (

        <div className="container">
            {context.loginStatus !== Status.None && context.loginStatus === Status.Success && <Navigate to="/home"/>}
            <div className="row d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
                <div className="col-md-6">
                    <form style={{margin: "10px"}} onClick={ProtectForm}>
                        <div className="text-center">
                            <img className="mb-4" style={{border: "5px solid #1C1C1C"}} src={filebox} alt="" width="300"
                                 height="150"/>
                        </div>

                        <div className="form-floating mb-4">
                            <input type="text" className="form-control" id="floatingInput"
                                   style={{backgroundColor: "#272727", color: "#B2B2B2", borderColor: "#808080"}}
                                   placeholder="Username"
                                   onChange={HandleUsername}/>
                            <label style={{color: "#272727"}} htmlFor="floatingInput">Username</label>
                        </div>


                        <div className="form-floating mb-4">
                            <input type="password" onChange={HandlePassword} className="form-control"
                                   id="floatingPassword"
                                   style={{
                                       backgroundColor: "#272727",
                                       color: "#B2B2B2",
                                       height: "10px",
                                       borderColor: "#808080"
                                   }} placeholder="Password"/>

                            <label style={{color: "#272727"}} htmlFor="floatingPassword">Password</label>
                        </div>

                        <div className="text-center mb-4">
                            <button id="login-button"
                                    onClick={HandleLoginButton}
                                    className="btn btn-primary w-10 py-2"
                                    style={{
                                        backgroundColor: "#272727",
                                        color: "#B2B2B2",
                                        borderColor: "#808080"
                                    }}
                                    type="submit">Login
                            </button>
                            <hr/>
                            <Link to="/forgot-password">
                                <button
                                    className="btn btn-primary w-10 py-2"
                                    style={{
                                        backgroundColor: "#272727",
                                        color: "#B2B2B2",
                                        borderColor: "#808080"
                                    }}
                                    type="submit">Forgot Password
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LoginComponent;
