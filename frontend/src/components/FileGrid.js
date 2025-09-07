import React, {useContext, useState} from "react";
import {Context} from "../Context/ContextProvider";
import {DownloadFile} from "../service/DownloadService";
import {Status} from "../Status";
import {RemoveFileWithFileId, RemoveMultipleFileByFileIds} from "../service/RemoveService";
import pdf_file from "../images/filetype-pdf.svg";
import java_file from "../images/java-svgrepo-com.svg";
import image_image from "../images/image-photo-svgrepo-com.svg";
import video_image from "../images/video-course-svgrepo-com.svg";
import music_image from "../images/music-svgrepo-com.svg";
import text_image from "../images/clipboard-list-svgrepo-com.svg";
import zip_image from "../images/zip-svgrepo-com.svg";
import js_file from "../images/javascript-svgrepo-com.svg";
import bash_file from "../images/bash-icon-svgrepo-com.svg";
import code_file from "../images/code-svgrepo-com.svg";
import dat_file from "../images/dat-svgrepo-com.svg";
import dll_file from "../images/dll-svgrepo-com.svg";
import word_file from "../images/word2-svgrepo-com.svg";
import exe_file from "../images/exe-svgrepo-com.svg";
import powerpoint_image from "../images/powerpoint2-svgrepo-com.svg";
import excel_image from "../images/excel2-svgrepo-com.svg";
import file_image from "../images/file-svgrepo-com.svg";
import {CopyFileToAnotherFolder} from "../service/CopyService";
import {MoveFileToAnotherFolder} from "../service/MoveService";
import ToastMessage from "./ToastMessage";
import RightClickComponent from "./RightClickComponent";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const FileGrid = ({file, handleFile, handleRenameFile, handleMultipleFileCheckbox, multipleFiles, clearCheckBoxes}) =>
{
    const [success, setSuccess] = useState()
    const context = useContext(Context)
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [movedFileId, setMovedFileId] = useState(-1)
    const [transferSuccess, setTransferSuccess] = useState(false)
    const HandleDownloadFile = async (file) =>
    {
        context.setIsUpload(false)
        await DownloadFile(file, progress => context.setDownloadProgress(progress))
            .then(async result =>
            {
                context.setDownloadFileStatus(Status.Success)
                context.setShowAlert(true)
                setSuccess(true)
            })
            .catch(error =>
            {

                context.setDownloadFileStatus(Status.Fail)
                context.setShowAlert(true)
                setSuccess(false)
            })
            .finally(() => context.setDownloadProgress(0))
    };

    const HandleRemoveFile = async (file) =>
    {
        await RemoveFileWithFileId(file.file_id)
        context.setFileView((prevFile) => prevFile.filter((f) => f.file_id !== file.file_id));
    };


    const determineFileImage = () =>
    {
        if (file.file_type === '.pdf')
        {
            return pdf_file;
        } else if (file.file_type === '.java')
        {
            return java_file;
        } else if (['.jpg', '.png', '.svg'].includes(file.file_type))
        {
            return image_image;
        } else if (['.mp4', '.m4v'].includes(file.file_type))
        {
            return video_image;
        } else if (['.mp3'].includes(file.file_type))
        {
            return music_image;
        } else if (['.txt'].includes(file.file_type))
        {
            return text_image;
        } else if (['.zip', '.rar'].includes(file.file_type))
        {
            return zip_image;
        } else if (['.js'].includes(file.file_type))
        {
            return js_file;
        } else if (['.sh'].includes(file.file_type))
        {
            return bash_file;
        } else if (['.cs', '.pdb', '.json'].includes(file.file_type))
        {
            return code_file;
        } else if (['.dat'].includes(file.file_type))
        {
            return dat_file;
        } else if (['.dll'].includes(file.file_type))
        {
            return dll_file;
        } else if (['.docx'].includes(file.file_type))
        {
            return word_file;
        } else if (['.exe'].includes(file.file_type))
        {
            return exe_file;
        } else if (['.ppt', '.pptx'].includes(file.file_type))
        {
            return powerpoint_image;
        } else if (['.xls', '.xlsx'].includes(file.file_type))
        {
            return excel_image;
        }
        return file_image;
    };

    const calculateFileSize = (bytes) =>
    {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = 2 < 0 ? 0 : 2
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
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


    const handleDragStart = (event) =>
    {
        event.dataTransfer.setData('file', file.file_id);
        setMovedFileId(file.file_id)
    };


    const refreshDelete = async () =>
    {
        if (movedFileId !== -1)
        {
            context.setFileView((fileView) => fileView.filter(f => f.file_id !== movedFileId));
            context.setMoveSuccess(false)
        }
    };

    const HandleCopyFile = (file) =>
    {
        localStorage.setItem("copied_file", JSON.stringify(file))
        localStorage.setItem("cut_file", null)
    };
    const HandleMoveFile = (file) =>
    {
        localStorage.setItem("cut_file", JSON.stringify(file))
        localStorage.setItem("copied_file", null)
    };
    const HandlePasteFile = async (folder) =>
    {
        let transferFolderId = folder.folder_id ? folder.folder_id : folder.folderId
        let file_operation = null;

        if (JSON.parse(localStorage.getItem("copied_file")))
        {
            file_operation = JSON.parse(localStorage.getItem("copied_file"))
            const response = await CopyFileToAnotherFolder(file_operation.file_id, transferFolderId)
            localStorage.setItem("copied_file", null)
            refreshFiles(response.new_file)
            context.setShowAlert(true)
            setTransferSuccess(true)

        } else if (JSON.parse(localStorage.getItem("cut_file")))
        {
            file_operation = JSON.parse(localStorage.getItem("cut_file"))
            const response = await MoveFileToAnotherFolder(file_operation.file_id, transferFolderId);
            localStorage.setItem("cut_file", null)
            refreshFiles(response.new_file)
            context.setShowAlert(true)
            setTransferSuccess(true)
        }
    };

    const HandleRemoveMultipleFile = async () =>
    {
        await RemoveMultipleFileByFileIds(multipleFiles)
        context.setFileView((prevFile) => prevFile.filter(f => !multipleFiles.includes(f.file_id)));
        clearCheckBoxes();
    };

    const refreshFiles = (file) =>
    {
        context.setFileView(prev => [...prev, file])
    };

    return (
        <div
            onContextMenu={handleContextMenu}
            onClick={handleOnClick}
            draggable
            onDragStart={handleDragStart}
            style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {context.moveSuccess && refreshDelete()}
            {context.cutOrCopySuccess && refreshFiles()}
           <OverlayTrigger
               key="top"
               placement="top"
               overlay={<Tooltip id={`tooltip-top`}>{file.file_name}</Tooltip>}>

               <a
                   id="file-image-ref"
                   onClick={() => handleFile(file)}
                   style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>

                   <img
                       src={determineFileImage()}
                       style={{ marginRight: "5px" }}
                       alt="file"
                       height="65"
                       width="65"
                   />
                   <label
                       id="file-name-label"
                       style={{
                           color: "#b2b2b2",
                           width: "80px",
                           margin: "20px", // Yeni stil
                       }}>
                       {file.file_name.length > 1 ? file.file_name.substring(0, 8) + "..." : file.file_name}
                   </label>
               </a>
           </OverlayTrigger>


            {transferSuccess && <ToastMessage message="File Transfer occured successfully!" title="Success" rightSideMessage="now"/>}
            {success && <ToastMessage message="Download Operation is successful!" title="Success" rightSideMessage="now"/>}

            {showContextMenu && (
                <div style={{
                    position: 'absolute',
                    zIndex: '100',
                    top: context.yPosition,
                    left: context.xPosition,
                    backgroundColor: "#272727"
                }}>
                    <RightClickComponent
                        download={() => HandleDownloadFile(file)}
                        rename={() => handleRenameFile(file)}
                        remove={() => HandleRemoveFile(file)}
                        handleCopyFile={() => HandleCopyFile(file)}
                        handleCutFile={() => HandleMoveFile(file)}
                        handlePasteFile={() => HandlePasteFile((context.currentFolder ? context.currentFolder : context.rootFolder))}
                        removeMultipleFiles={HandleRemoveMultipleFile}
                    />
                </div>
            )}
        </div>
    );
}

export default FileGrid;
