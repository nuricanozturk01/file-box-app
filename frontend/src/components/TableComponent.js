import React, {useContext, useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import PopupComponent from "./PopupComponent";
import {Context} from "../Context/ContextProvider";
import PopupRename from "./PopupRename";
import FolderRow from "./FolderRow";
import FileRow from "./FileRow";
import {
    FindFilesOnFolder,
    FindFoldersByUserIdAndFolderId,
    FindRootFolderByUserId
} from "../service/FindFoldersByUserIdAndFolderId";


const TableComponent = ({navigateId}) =>
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

    const HandleMultipleFileCheckbox = async (file) => {
        if (!multipleFileList.includes(file.file_id)) {
            let prev = multipleFileList
            prev.push(file.file_id)
            setMultipleFileList(prev)
        } else {
            let k = multipleFileList;
            k = k.filter(f => f !== file.file_id);
            setMultipleFileList(k)
        }
    };

    const HandleClearSelections = () =>
    {
        const checkboxes = document.querySelectorAll('.form-check-input');

        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        setMultipleFileList([])
    };

    return (
        <div>

            <div>

                {!click && (

                    <Table id="table" className="table-dark table-hover table-bordered" style={{backgroundColor: "#272727"}} >
                        <thead style={{textAlign: "center", backgroundColor: "#272727"}}>

                        <tr id="file-and-folder-tablerow-header">
                            <th style={{backgroundColor: "#272727", color: "#b2b2b2"}}>File And Folder</th>
                            <th style={{backgroundColor: "#272727", color: "#b2b2b2"}}>Creation Date</th>
                            <th style={{backgroundColor: "#272727", color: "#b2b2b2"}}>File Size</th>
                            <th style={{backgroundColor: "#272727", color: "#b2b2b2"}}>
                                <button
                                        onClick={HandleClearSelections}
                                        className="btn btn-primary"
                                        style={{
                                            height: "36px",
                                            backgroundColor: "#272727",
                                            color: "#B2B2B2",
                                            borderColor: "#808080"
                                        }}
                                        type="submit"> Clear
                                </button>
                            </th>
                        </tr>

                        </thead>


                        <tbody id="table-body" style={{backgroundColor: "#272727"}}>

                        {/*List Folders*/}
                        {context.folderView.map((folder, idx) => (
                            <FolderRow
                                key={idx}
                                folder={folder}
                                handleFolderClick={HandleFolderClick}
                                handleRenameFolder={HandleRenameFolder}
                            />
                        ))}


                        {/*List Files*/}
                        {context.fileView.map((file, idx) => (
                            <FileRow
                                key={idx}
                                file={file}
                                handleFile={HandleFile}
                                handleRenameFile={HandleRenameFile}
                                handleMultipleFileCheckbox={() => HandleMultipleFileCheckbox(file)}
                                multipleFiles={multipleFileList}
                                clearCheckBoxes={HandleClearSelections}
                            />
                        ))}
                        </tbody>

                    </Table>)}


                <div>
                    {isClickMenu &&
                        <PopupRename isFile={renamingFile}
                                     isFolder={renamingFolder}
                                     onClose={async () => await ClosePopupHandler()}
                                     renameFile={viewFile}
                                     renameFolder={viewFolder}/>
                    }
                </div>

                <div>
                    {click && <PopupComponent
                        viewFile={viewFile}
                        onClose={async () => await ClosePopupHandler()}/>
                    }
                </div>
            </div>
        </div>

    );
}

export default TableComponent;
