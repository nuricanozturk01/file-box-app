import React, {useContext, useEffect, useState} from "react";
import {RenameFileWithFileId} from "../service/RenameService";
import './DropDown.css'
import {Context} from "../Context/ContextProvider";
import {Status} from "../Status";
import ToastMessage from "./ToastMessage";

const RenameFile = ({file}) =>
{
    const [newFileName, setNewFileName] = useState()
    const [renameFile, setRenameFile] = useState(null)
    const [success, setSuccess] = useState()
    const blacklist = ['/', '\\', '>', '<', ':', '"', '|', '?', '*']
    const context = useContext(Context)
    useEffect(() =>
    {
        setRenameFile(file)
    }, [file])

    const HandleNewFileName = (event) =>
    {
        const newInput = event.target.value
        if (blacklist.some(w => newInput.includes(w)))
        {
            context.setIllegalChar(Status.Success)
            context.setShowAlert(true)
        } else
        {
            setNewFileName(newInput)
            context.setIllegalChar(Status.Fail)
            context.setShowAlert(false)
        }
    };
    const HandleSubmitButton = async () =>
    {
        if (context.illegalChar === Status.Fail || context.illegalChar === Status.None)
        {
            const response = await RenameFileWithFileId(renameFile.file_id, newFileName)
            if (response)
            {
                context.setShowAlert(true)
                setSuccess(true)
            }
            context.fileView
                .filter(fw => fw.file_id === file.file_id)
                .map(fw =>
                {
                    fw.file_name = newFileName;
                    fw.file_path = response.file.file_path;
                    fw.created_date = response.file.created_date;
                    fw.real_path = response.file.real_path
                })
        }

    };


    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

            {success && <ToastMessage message="File name changed Successfully!" title="Notification" rightSideMessage="now"/>}

            <div className="form-floating mb-4" style={{position: "relative"}}>
                {context.illegalChar !== Status.None && context.illegalChar === Status.Success &&
                    <div className="row alert alert-warning justify-content-center" style={{
                        marginBottom: "45px",
                    }} role="alert">
                        You cannot enter the /\*?{'<>'}:"| characters!
                    </div>}

                <label
                    htmlFor="floatingInput"
                    style={{
                        backgroundColor: "#1c1c1c",
                        color: "#b2b2b2",
                        marginBottom: "0px",
                        position: "inherit",
                        top: "50%",
                        left: "50%",
                        borderColor: "#b2b2b2",
                        transform: "translate(-50%, -50%)"
                    }}>
                    Please Enter the New File Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="rename-file-input"
                    style={{
                        backgroundColor: "#272727",
                        color: "#B2B2B2",
                        borderColor: "#808080",
                        width: "400px"
                    }}
                    placeholder="New File Name"
                    onChange={HandleNewFileName}
                />

            </div>

            <button
                id="rename-file-button"
                onClick={HandleSubmitButton}
                className="btn btn-primary py-2"
                style={{
                    width: "150px",
                    backgroundColor: "#272727",
                    color: "#B2B2B2",
                    borderColor: "#808080",
                }} type="submit">
                Rename
            </button>
        </div>
    );
}

export default RenameFile;
