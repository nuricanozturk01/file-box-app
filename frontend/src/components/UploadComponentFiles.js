import React, {useContext, useEffect, useState} from "react";
import './UploadComponent.css'
import {Context} from "../Context/ContextProvider";
import {FindRootFolderByUserId} from "../service/FindFoldersByUserIdAndFolderId";
import {UploadFilesCallback} from "../service/UploadService";
import {Status} from "../Status";
import ToastMessage from "./ToastMessage";


const UploadComponentFiles = () =>
{
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [rootFolder, setRootFolder] = useState(1)
    const [success, setSuccess] = useState()
    const context = useContext(Context)
    const HandleFiles = (event) =>
    {
        const files = event.target.files;
        setSelectedFiles(Array.from(files));
    };
    useEffect(() =>
    {
        const findRoot = async () =>
        {
            const root = await FindRootFolderByUserId();
            setRootFolder(root.folder_id)
        }
        findRoot()

    }, [])

    const loadData = (responseData) =>
    {
        for (let i = 0; i < responseData.length; ++i)
        {
            const file = responseData[i].files[0]
            const dto = {
                created_date: file.created_date,
                file_byte: file.file_byte,
                file_id: file.file_id,
                file_name: file.file_name,
                file_path: file.file_path,
                file_type: file.file_type,
                real_path: file.real_path
            }
            context.setFileView(prev => [...prev, dto])
        }
    };
    const HandleUploadButton = async () =>
    {
        context.setIsUpload(true)
        //context.setUploadProgress(0)
        let folderId = await rootFolder;

        if (context.currentFolder && context.currentFolder.folderId)
            folderId = context.currentFolder.folderId


        await UploadFilesCallback(folderId, selectedFiles, (progressDictionary) =>
        {
            context.setUploadProgress(map => new Map(map.set(progressDictionary.fileName, progressDictionary.progress)))
        })
            .then(async response =>
            {
                await loadData(response)
                context.setUploadFileStatus(Status.Success)
                context.setShowAlert(true)
                setSuccess(true)
            })
            .catch(error =>
            {
                context.setUploadFileStatus(Status.Fail)
                context.setShowAlert(true)
                setSuccess(false)
            })
            .finally(
                //context.setUploadProgress(0)
            );
    };

    return (
        <div>
            <div className="input-group mb-3"
                 style={{height: "40px", marginTop: "30px", marginBottom: "-30px", backgroundColor: "#272727"}}>

                <input type="file" multiple className="form-control" id="upload-file-options-navbar"
                       style={{backgroundColor: "#272727", color: "#b2b2b2", borderColor: "#272727"}}
                       onChange={HandleFiles}/>

                <button color="white"
                        className="btn btn-outline-secondary" type="button" id="upload-file-button"
                        onClick={HandleUploadButton}>Upload
                </button>
            </div>

            {success && <ToastMessage message="Files uploaded successfully!" title="Success" rightSideMessage="now"/>}
        </div>

    );
}
export default UploadComponentFiles;
