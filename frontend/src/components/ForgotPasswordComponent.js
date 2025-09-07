import React, {useContext, useState} from "react";
import filebox from "../images/filebox_logo.png";
import ValidatePassword from "../service/ForgotPasswordService";
import {Status} from "../Status";
import {Context} from "../Context/ContextProvider";

const ForgotPasswordComponent = () =>
{
    const [email, setEmail] = useState(null);
    const context = useContext(Context)

    const HandleEmail = (event) =>
    {
        setEmail(event.target.value)
    };

    const HandleSubmitButton = async () =>
    {
        const response = await ValidatePassword(email);

        context.setSuccessSentEmail(response.success ? Status.Success : Status.Fail)
        context.setShowAlert(true)
    };

    return (
        <div className="container">
            <div className="row d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
                <div className="col-md-6">
                    <form style={{margin: "10px"}} onClick={event => event.preventDefault()}>
                        <div className="text-center">
                            <img className="mb-4" style={{border: "5px solid #1C1C1C"}} src={filebox} alt="" width="300"
                                 height="150"/>
                        </div>

                        <div className="form-floating mb-4">
                            <input type="text" className="form-control" id="floatingInput"
                                   style={{backgroundColor: "#272727", color: "#B2B2B2", borderColor: "#808080"}}
                                   placeholder="Email"
                                   onChange={HandleEmail}/>
                            <label style={{color: "#272727"}} htmlFor="floatingInput">Email</label>
                        </div>


                        <div className="text-center mb-4">
                            <button onClick={HandleSubmitButton}
                                    className="btn btn-primary w-10 py-2"
                                    style={{backgroundColor: "#272727", color: "#B2B2B2", borderColor: "#808080"}}
                                    type="submit">Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}
export default ForgotPasswordComponent;
