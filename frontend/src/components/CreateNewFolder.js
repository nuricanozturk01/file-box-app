import React, {useContext, useEffect, useState} from "react";
import {Context} from "../Context/ContextProvider";
import {CreateFolder} from "../service/UploadService";
import {FindRootFolderByUserId} from "../service/FindFoldersByUserIdAndFolderId";
import {Status} from "../Status";
import ToastMessage from "./ToastMessage";

const CreateNewFolder = () =>
{
    const context = useContext(Context)
    const [rootFolder, setRootFolder] = useState()
    const [newFolderName, setNewFolderName] = useState()
    const [success, setSuccess] = useState()
    const blacklist = ['/', '\\', '>', '<', ':', '"', '|', '?', '*']
    useEffect(() =>
    {
        const findRoot = async () =>
        {
            const root = await FindRootFolderByUserId();
            setRootFolder(root.folder_id)
        }
        findRoot()

    }, [])
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
        if (context.illegalChar === Status.Fail || context.illegalChar === Status.None)
        {
            let folderId = await rootFolder;

            if (context.currentFolder && context.currentFolder.folderId)
                folderId = context.currentFolder.folderId

            const response = await CreateFolder(folderId, newFolderName)
            if (response)
            {
                context.setShowAlert(true)
                setSuccess(true)
            }
            const dto = {
                creationDate: response.creation_date,
                folderId: response.folderId,
                folderName: response.folder_name,
                folderPath: response.folder_path,
                folder_files: []
            }

            context.setFolderView(prev => [...prev, dto])
        }
    };
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {success && <ToastMessage message="Folder created Successfully!" title="Notification" rightSideMessage="now"/>}
            <div className="form-floating mb-4" style={{position: "relative"}}>
                {context.illegalChar !== Status.None && context.illegalChar === Status.Success &&
                    <div id="invalid-created-folder-name" className="row alert alert-warning justify-content-center" style={{
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
                    Please Enter the Folder Name
                </label>

                <input
                    type="text"
                    className="form-control"
                    id="create-folder-input"
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
                id="create-folder-button"
                onClick={HandleSubmitButton}
                className="btn btn-primary py-2"
                style={{
                    width: "150px",
                    backgroundColor: "#272727",
                    color: "#B2B2B2",
                    borderColor: "#808080",
                }} type="submit">
                Create Folder
            </button>
        </div>
    );
}
export default CreateNewFolder;
