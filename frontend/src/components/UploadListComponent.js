import file_image from '../images/file-minus-svgrepo-com.svg'
import {ProgressBar} from "react-bootstrap";
import React, {useContext} from "react";
import {Context} from "../Context/ContextProvider";


const UploadListComponent = () =>
{

    const context = useContext(Context)

    return (
        <div>
            {Array.from(context.uploadProgress.keys()).map((fileName) =>
                (
                <div  className="container" key={fileName}>
                    <img src={file_image} alt="file" width="60px" height="50px"/>
                    <span style={{color: "#b2b2b2"}}>{fileName}</span>
                    <ProgressBar now={context.uploadProgress.get(fileName)} style={{height: "10px", width: "330px", marginTop: "5px"}}></ProgressBar>
                    <br/>
                </div>
            ))}
        </div>

    );
}
export default UploadListComponent;
