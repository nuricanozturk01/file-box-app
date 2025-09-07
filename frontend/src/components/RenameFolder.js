import React, {useContext, useEffect, useState} from "react";
import {RenameFolderWithFolderId} from "../service/RenameService";
import {Context} from "../Context/ContextProvider";
import {Status} from "../Status";
import ToastMessage from "./ToastMessage";

const RenameFolder = ({folder}) =>
{
    const [newFolderName, setNewFolderName] = useState()
    const [renameFolder, setRenameFolder] = useState(null)
    const [success, setSuccess] = useState()
    const blacklist = ['/', '\\', '>', '<', ':', '"', '|', '?', '*']
    const context = useContext(Context)
    useEffect(() =>
    {
        setRenameFolder(folder)
    }, [folder])

    const HandleNewFolderName = (event) =>
    {
        const newInput = event.target.value
        if (blacklist.some(w => newInput.includes(w)))
        {
            context.setIllegalChar(Status.Success)
            context.setShowAlert(true)
        } else
        {
            setNewFolderName(newInput)
            context.setIllegalChar(Status.Fail)
            context.setShowAlert(false)
        }
    };
    const HandleSubmitButton = async () =>
    {
        try
        {
            if (context.illegalChar === Status.Fail || context.illegalChar === Status.None)
            {
                const response = await RenameFolderWithFolderId(renameFolder.folderId, newFolderName)
                console.log(response)
                if (response)
                {
                    context.setShowAlert(true)
                    setSuccess(true)
                }
                context.folderView
                    .filter(fw => fw.folderId === folder.folderId)
                    .map(fw =>
                    {
                        fw.creationDate = response.folder.creationDate;
                        fw.folderPath = response.folder.folderPath;
                        fw.folderId = response.folder.folderId;
                        fw.folderName = newFolderName;
                        fw.folder_files = response.folder.folder_files;
                    })
            }

        } catch (error)
        {

        }
    };
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {success && <ToastMessage message="Folder name changed Successfully!" title="Notification" rightSideMessage="now"/>}
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
                        position: "inherit",
                        top: "50%",
                        left: "50%",
                        borderColor: "#b2b2b2",
                        transform: "translate(-50%, -50%)"
                    }}>
                    Please Enter the New Folder Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="rename-folder-input"
                    style={{
                        backgroundColor: "#272727",
                        color: "#B2B2B2",
                        borderColor: "#808080",
                        width: "400px"
                    }}
                    placeholder="New File Name"
                    onChange={HandleNewFolderName}
                />

            </div>

            <button
                id="rename-folder-button"
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

export default RenameFolder;
