import {Status} from "../Status";
import React, {useContext, useEffect} from "react";
import {Context} from "../Context/ContextProvider";

const MessageComponent = () =>
{
    const context = useContext(Context)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() =>
    {
        if (context.showAlert)
        {
            const timer = setTimeout(() =>
            {
                context.setShowAlert(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [context, context.showAlert]);


    return (
        <div className="container col-md-3">
            {context.loginStatus !== Status.None && context.loginStatus === Status.Fail &&
                <div id = "unsuccess-login" className="row alert alert-danger justify-content-center"
                     role="alert"
                     style={{width: "350px"}}>Please control the username and password</div>}

            {context.successSentEmail !== Status.None && context.successSentEmail === Status.Success &&
                <div className="row alert alert-info justify-content-center" role="alert">Please check the email box!</div>}

            {context.successSentEmail !== Status.None && context.successSentEmail === Status.Fail &&
                <div className="row alert alert-danger justify-content-center" role="alert">User Not Found!</div>}

        </div>
    );
}
export default MessageComponent;
