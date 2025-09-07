import React, {useContext, useEffect, useState} from "react";
import {Context} from "../Context/ContextProvider";
import {FindRootFolderByUserId} from "../service/FindFoldersByUserIdAndFolderId";
import ToastMessage from "./ToastMessage";
const UploadFolderComponent = () => {

    const [selectedFolder, setSelectedFolder] = useState(null);
    const [rootFolder, setRootFolder] = useState(1)
    const [success, setSuccess] = useState()
    const context = useContext(Context)
    const HandleFolder = (event) =>
    {
        const folder = event.target.files[0];
        console.log(folder)
        setSelectedFolder(folder);
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

        if (selectedFolder) {



        }

    };

    return (
        <div>
            <div className="input-group mb-3"
                 style={{height: "40px", marginTop: "30px", marginBottom: "-30px", backgroundColor: "#272727"}}>
                <input type="file" webkitdirectory="true" directory="true" multiple={true} className="form-control"
                       id="inputGroupFile02"
                       style={{backgroundColor: "#272727", color: "#b2b2b2", borderColor: "#272727"}}
                       onChange={HandleFolder}/>

                <button color="white" className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon02"
                        onClick={HandleUploadButton}>Upload
                </button>
            </div>

            {success && <ToastMessage message="Files uploaded successfully!" title="Success" rightSideMessage="now"/>}
        </div>
    );
}
export default UploadFolderComponent;
