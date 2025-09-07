import {createContext, useState} from "react";
import {Status} from "../Status";
import {ViewStatus} from "../ViewStatus";


export const Context = createContext();
const ContextProvider = (props) =>
{
    const [title, setTitle] = useState([])
    const [currentFolder, setCurrentFolder] = useState()
    const [rootFolder, setRootFolder] = useState()
    const [folderView, setFolderView] = useState([]);
    const [fileView, setFileView] = useState([]);

    const [downloadFolderStatus, setDownloadFolderStatus] = useState(Status.None)
    const [downloadFileStatus, setDownloadFileStatus] = useState(Status.None)
    const [uploadFileStatus, setUploadFileStatus] = useState(Status.None)
    const [loginStatus, setLoginStatus] = useState(Status.None)
    const [showAlert, setShowAlert] = useState(false)
    let [uploadProgress, setUploadProgress] = useState(new Map())
    const [downloadProgress, setDownloadProgress] = useState(0)
    const [isUpload, setIsUpload] = useState(false)
    const [successSentEmail, setSuccessSentEmail] = useState(Status.None)

    const [xPosition, setXPosition] = useState(0)
    const [yPosition, setYPosition] = useState(0)
    const [illegalChar, setIllegalChar] = useState(Status.None)


    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState([]);
    const [handleCopyFile, setHandleCopyFile] = useState(false)
    const [handleCutFile, setHandleCutFile] = useState(false)
    const [moveSuccess, setMoveSuccess] = useState(false)
    const [cutOrCopySuccess, setCutOrCopySuccess] = useState(false)
    const [mainView, setMainView] = useState(localStorage.getItem("view"))
    return (
        <Context.Provider value={{
            mainView, setMainView,
            cutOrCopySuccess, setCutOrCopySuccess,
            moveSuccess, setMoveSuccess,
            handleCutFile, setHandleCutFile,
            handleCopyFile, setHandleCopyFile,
            uploading, setUploading,
            progress, setProgress,
            successSentEmail, setSuccessSentEmail,
            yPosition, setYPosition,
            xPosition, setXPosition,
            title, setTitle,
            currentFolder, setCurrentFolder,
            rootFolder, setRootFolder,
            folderView, setFolderView,
            fileView, setFileView,
            downloadFolderStatus, setDownloadFolderStatus,
            downloadFileStatus, setDownloadFileStatus,
            uploadFileStatus, setUploadFileStatus,
            showAlert, setShowAlert,
            loginStatus, setLoginStatus,
            uploadProgress, setUploadProgress,
            downloadProgress, setDownloadProgress,
            isUpload, setIsUpload,
            illegalChar, setIllegalChar
        }}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;
