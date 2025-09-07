import React, {useEffect, useState} from "react";
import filebox from "../images/password-change-logo.jpg";
import {ChangePassword, ValidateToken} from "../service/ForgotPasswordService";
import {useLocation} from "react-router-dom";

const PasswordChangeScreen = () =>
{

    const [newPassword, setNewPassword] = useState(null);
    const [newPasswordAgain, setNewPasswordAgain] = useState(null);
    const [isChangedSuccessfully, setIsChangedSuccessfully] = useState("NONE")
    const [showAlert, setShowAlert] = useState(false)
// take a token from parameter
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentToken = searchParams.get('token');

    if (!currentToken || !searchParams)
        return <h3 style={{backgroundColor: "#ffffff"}}>BAD REQUEST</h3>

    if (!ValidateToken(currentToken))
        return <h3 style={{backgroundColor: "#ffffff"}}>Please try again!</h3>
    const HandleSubmitButton = async () =>
    {
        if (newPassword === newPasswordAgain)
            setIsChangedSuccessfully(await ChangePassword(newPassword, currentToken) ? "YES" : "NO");

        else setIsChangedSuccessfully("NO")
        setShowAlert(true)

    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() =>
    {
        if (showAlert)
        {
            const timer = setTimeout(() =>
            {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);


    return (
        <div className="container">

            {showAlert && isChangedSuccessfully === "NO" && isChangedSuccessfully !== "NONE" &&
                <div className="alert alert-warning" role="alert">Password does not changed! Please be sure they are
                    equal!</div>}

            {showAlert && isChangedSuccessfully === "YES" && isChangedSuccessfully !== "NONE" &&
                <div className="alert alert-success" role="alert">Password changed Successfully!</div>}


            <div className="row d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
                <div className="col-md-6">
                    <form style={{margin: "10px"}} onClick={event => event.preventDefault()}>
                        <div className="text-center">
                            <img className="mb-4" style={{border: "5px solid #1C1C1C"}} src={filebox} alt="" width="300"
                                 height="350"/>
                        </div>

                        <div className="form-floating mb-4">
                            <input type="password" className="form-control" id="floatingPassword"
                                   style={{backgroundColor: "#272727", color: "#B2B2B2", borderColor: "#808080"}}
                                   onChange={event => setNewPassword(event.target.value)}/>
                            <label style={{color: "#272727"}} htmlFor="floatingPassword">Password</label>
                        </div>


                        <div className="form-floating mb-4">
                            <input type="password" onChange={event => setNewPasswordAgain(event.target.value)}
                                   className="form-control"
                                   id="floatingPasswordAgain"
                                   style={{
                                       backgroundColor: "#272727", color: "#B2B2B2",
                                       height: "10px", borderColor: "#808080",
                                   }}/>

                            <label style={{color: "#272727"}} htmlFor="floatingPasswordAgain">Password Again</label>
                        </div>

                        <div className="text-center mb-4">
                            <button onClick={HandleSubmitButton}
                                    className="btn btn-primary w-10 py-2"
                                    style={{backgroundColor: "#272727", color: "#B2B2B2", borderColor: "#808080"}}
                                    type="submit">ChangePassword
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );

}

export default PasswordChangeScreen;
