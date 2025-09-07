import React, {useContext, useState} from "react";
import {Context} from "../Context/ContextProvider";
import {DownloadFolder} from "../service/DownloadService";
import {Status} from "../Status";
import {RemoveFolderWithFolderId} from "../service/RemoveService";
import {MoveFileToAnotherFolder} from "../service/MoveService";
import {CopyFileToAnotherFolder} from "../service/CopyService";
import folder_image from "../images/folder.png";
import RightClickComponent from "./RightClickComponent";
import ToastMessage from "./ToastMessage";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const FolderGrid = ({folder, handleFolderClick, handleRenameFolder}) =>
{
    const [success, setSuccess] = useState()
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [transferSuccess, setTransferSuccess] = useState(false)
    const context = useContext(Context)
    const HandleDownloadFolder = async (folder) =>
    {
        context.setIsUpload(false)
        await DownloadFolder(folder, progress => context.setDownloadProgress(progress))
            .then(async result =>
            {
                context.setDownloadFolderStatus(Status.Success)
                context.setShowAlert(true)
                setSuccess(true)
            })
            .catch(error =>
            {
                context.setDownloadFolderStatus(Status.Fail)
                context.setShowAlert(true)
                setSuccess(false)
            })
            .finally(() => context.setDownloadProgress(0))
    };
    const HandleRemoveFolder = async (folder) =>
    {
        await RemoveFolderWithFolderId(folder.folderId)
        context.setFolderView((prevFolderView) =>
            prevFolderView.filter((f) => f.folderId !== folder.folderId)
        );
    };
    const handleContextMenu = (e) =>
    {
        e.preventDefault();

        setShowContextMenu(true);
        context.setXPosition(e.pageX);
        context.setYPosition(e.pageY);
        document.addEventListener('click', handleClickOutside);
    };
    const handleClickOutside = () =>
    {
        setShowContextMenu(false);
        document.removeEventListener('click', handleClickOutside);
    };
    const handleOnClick = (e) =>
    {
        setShowContextMenu(false);
    };

    const handleDragOver = (e) =>
    {
        e.preventDefault();
    };
    const handleDrop = (event) =>
    {
        event.preventDefault();
        const file_id = event.dataTransfer.getData('file');

        MoveFileToAnotherFolder(file_id, folder.folderId);
        context.setMoveSuccess(true)
        context.setShowAlert(true)
        setTransferSuccess(true)
    };

    const HandlePasteFile = async (folder) =>
    {
        let file_operation = null;

        if (JSON.parse(localStorage.getItem("copied_file")))
        {
            file_operation = JSON.parse(localStorage.getItem("copied_file"))
            localStorage.setItem('target_folder', folder)
            await CopyFileToAnotherFolder(file_operation.file_id, folder.folderId)
            context.setMoveSuccess(true)
            context.setHandleCopyFile(null)
            context.setCutOrCopySuccess(true)
        }

        else if (JSON.parse(localStorage.getItem("cut_file")))
        {
            localStorage.setItem('target_folder', folder)
            file_operation = JSON.parse(localStorage.getItem("cut_file"))
            await MoveFileToAnotherFolder(file_operation.file_id, folder.folderId);
            context.setHandleCutFile(null)
            context.setCutOrCopySuccess(true)
        }

    };

    return (
        <div
            onContextMenu={handleContextMenu}
            onClick={handleOnClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ textAlign: "center" }}>

            <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip id={`tooltip-top`}>{folder.folderName}</Tooltip>}>

                <a id="folder-image-ref" onClick={() => handleFolderClick(folder)}>
                    <img src={folder_image} alt="folder" height="65" width="65" />
                    <br />
                    <label
                        id="folder-name-label"
                        style={{
                            color: "#b2b2b2",
                            textAlign: "center",
                            width: "80px",
                            margin: "20px",
                        }}
                    >
                        {folder.folderName.length > 8 ? folder.folderName.substring(0, 8) + "..." : folder.folderName}
                    </label>
                </a>
            </OverlayTrigger>

            {showContextMenu && (
                <div style={{
                    position: 'absolute',
                    zIndex: '100',
                    top: context.yPosition,
                    left: context.xPosition,
                    backgroundColor: "#272727"
                }}>
                    <RightClickComponent
                        download={() => HandleDownloadFolder(folder)}
                        rename={() => handleRenameFolder(folder)}
                        remove={() => HandleRemoveFolder(folder)}
                        handlePasteFile={() => HandlePasteFile(folder)}
                    />
                </div>
            )}

            {transferSuccess && <ToastMessage message="File Transfer occured successfully!" title="Success" rightSideMessage="now"/>}
            {success && <ToastMessage message="Download Operation is successful!" title="Success" rightSideMessage="now"/>}
        </div>
    );
}

export default FolderGrid;
