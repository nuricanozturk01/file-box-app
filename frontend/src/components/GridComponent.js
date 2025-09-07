import React, {useContext, useEffect, useState} from "react";
import {Context} from "../Context/ContextProvider";
import {
    FindFilesOnFolder,
    FindFoldersByUserIdAndFolderId,
    FindRootFolderByUserId
} from "../service/FindFoldersByUserIdAndFolderId";
import FolderGrid from "./FolderGrid";
import FileGrid from "./FileGrid";
import PopupRename from "./PopupRename";
import PopupComponent from "./PopupComponent";

const GridComponent = ({navigateId}) =>
{
    // Listing components
    const [click, setClick] = useState(false)
    const [multipleFileList, setMultipleFileList] = useState([])
    const [viewFile, setViewFile] = useState(null)
    const [viewFolder, setViewFolder] = useState(null)

    const [renamingFolder, setRenamingFolder] = useState(false)
    const [renamingFile, setRenamingFile] = useState(false)

    const [isClickMenu, setIsClickMenu] = useState(false);

    const context = useContext(Context)
    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const rootFolder = await FindRootFolderByUserId(localStorage.getItem('user_id'))
            const folders = await FindFoldersByUserIdAndFolderId(rootFolder.folder_id);
            const files = await FindFilesOnFolder(rootFolder.folder_id)
            context.setFolderView(folders)
            context.setFileView(files)
            context.setRootFolder(rootFolder)
        }

        fetchData()
    }, [])

    const HandleFolderClick = async (folder) =>
    {
        context.setCurrentFolder(folder)
        const folders = await FindFoldersByUserIdAndFolderId(folder.folderId);
        const files = await FindFilesOnFolder(folder.folderId)

        context.setFolderView(folders)
        context.setFileView(files)

        const newTitle = {
            shortName: folder.folderName,
            link: folder.folderPath,
            folderId: folder.folderId
        }
        context.setTitle(prev => [...prev, newTitle])
        setMultipleFileList([])
        HandleClearSelections()
    };


    function HandleFile(file)
    {
        setClick(true)
        setViewFile(file)
    }

    // close popup screen
    const ClosePopupHandler = async () =>
    {
        setClick(false)
        setIsClickMenu(false)
    };

    // For breadcrumb
    useEffect(() =>
    {
        if (navigateId > 0 && navigateId !== undefined && navigateId !== null)
        {
            const fetchData = async () =>
            {
                const folders = await FindFoldersByUserIdAndFolderId(navigateId);
                const files = await FindFilesOnFolder(navigateId)
                context.setFolderView(folders)
                context.setFileView(files)
            }
            fetchData()
            setMultipleFileList([])
            HandleClearSelections()
        }

    }, [navigateId])


    const HandleRenameFile = (file) =>
    {
        setIsClickMenu(true)
        setRenamingFile(true)
        setViewFile(file)

        setRenamingFolder(false)
        setViewFolder(null)
    };
    const HandleRenameFolder = (folder) =>
    {
        setIsClickMenu(true)
        setRenamingFolder(true)
        setViewFolder(folder)

        setRenamingFile(false)
        setViewFile(null)
    };

    const HandleMultipleFileCheckbox = async (file) =>
    {
        if (!multipleFileList.includes(file.file_id))
        {
            let prev = multipleFileList
            prev.push(file.file_id)
            setMultipleFileList(prev)
        } else
        {
            let k = multipleFileList;
            k = k.filter(f => f !== file.file_id);
            setMultipleFileList(k)
        }
    };

    const HandleClearSelections = () =>
    {
        const checkboxes = document.querySelectorAll('.form-check-input');

        checkboxes.forEach(checkbox =>
        {
            checkbox.checked = false;
        });

        setMultipleFileList([])
    };
    return (
        <div className="col-xs-12" style={{display: "flex", flexWrap: "wrap"}}>
            {!click && <div className="col-xs-12" style={{display: "flex", flexWrap: "wrap"}}>
                {/* List Folders */}
                {context.folderView.map((folder, idx) => (
                    <FolderGrid
                        key={idx}
                        folder={folder}
                        handleFolderClick={HandleFolderClick}
                        handleRenameFolder={HandleRenameFolder}
                    />
                ))}

                {/* List Files */}
                {context.fileView.map((file, idx) => (
                    <FileGrid
                        key={idx}
                        file={file}
                        handleFile={HandleFile}
                        handleRenameFile={HandleRenameFile}
                        handleMultipleFileCheckbox={() => HandleMultipleFileCheckbox(file)}
                        multipleFiles={multipleFileList}
                        clearCheckBoxes={HandleClearSelections}
                    />
                ))}
            </div>
            }
            <div>
                {isClickMenu && (
                    <PopupRename
                        isFile={renamingFile}
                        isFolder={renamingFolder}
                        onClose={async () => await ClosePopupHandler()}
                        renameFile={viewFile}
                        renameFolder={viewFolder}
                    />
                )}
            </div>

            <div>
                {click && (
                    <PopupComponent
                        viewFile={viewFile}
                        onClose={async () => await ClosePopupHandler()}/>
                )}
            </div>
        </div>

    );
}
export default GridComponent;
