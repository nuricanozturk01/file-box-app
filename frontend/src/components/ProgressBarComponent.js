import {ProgressBar} from "react-bootstrap";
import React, {useContext} from "react";
import {Context} from "../Context/ContextProvider";


const ProgressBarComponent = () =>{

    const context = useContext(Context)

    return (
        <div>
            <ProgressBar style={{
                marginTop: "-1%",
                marginBottom: "-1.9%",
                backgroundColor: "#272727",
                color: "#b2b2b2",
                height: "25px"
            }} now={context.isUpload ? context.uploadProgress : context.downloadProgress}
                         label={context.isUpload ? `${context.uploadProgress}%` : `${context.downloadProgress}%`}
            />
        </div>
    );
}
export default ProgressBarComponent;
