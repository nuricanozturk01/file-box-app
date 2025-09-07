import React, {useContext, useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Context} from "../Context/ContextProvider";
import PopupRename from "./PopupRename";
import {NavDropdown} from "react-bootstrap";
import {
    FilterFilesByFileExtension,
    SortFilesByCreationDate,
    SortFilesByFileSize
} from "../service/SortAndFilterService";
import UploadComponentFiles from "./UploadComponentFiles";
import {
    FindFilesOnFolder,
    FindFolderByFolderId,
    FindFoldersByUserIdAndFolderId, FindRootFolderByUserId
} from "../service/FindFoldersByUserIdAndFolderId";

import folder_image from '../images/folder-minus-svgrepo-com.svg'
import {Link} from "react-router-dom";
import {ViewStatus} from "../ViewStatus";

const OptionsNavBar = ({handleFolderClick}) =>
{

    const context = useContext(Context)
    const [isCreateFolder, setIsCreateFolder] = useState(false)
    const [isClickUploadFile, setIsClickUploadFile] = useState(false)
    const [isClickUploadFolder, setIsClickUploadFolder] = useState(false)

    const [selectedExtension, setSelectedExtension] = useState(null);

    //const [tmpFiles, setTmpFiles] = useState()
    const [extensions, setExtensions] = useState(['.jpg', '.png', '.pdf', '.docx'])

    useEffect(() =>
    {
        const extensions = context.fileView.map(fw => fw.file_type).filter((value, index, self) => self.indexOf(value) === index)
        setExtensions(extensions)
        // setExtensions(prev => [...prev, 'normal'])

    }, [context.fileView])
    const handleExtensionSelect = (extension) =>
    {
        setSelectedExtension(extension === selectedExtension ? null : extension);
    };

    const handleFilter = async () =>
    {
        if (selectedExtension)
        {
            /*if (selectedExtension === 'normal' && tmpFiles)
                context.setFileView(tmpFiles)*/

            let folderId = context.rootFolder.folder_id
            if (context.currentFolder)
                folderId = context.currentFolder.folderId

            const data = await FilterFilesByFileExtension(folderId, selectedExtension)

            context.setFileView(data.files)
        }
    };

    const ChangeDirectory = async (folderId) =>
    {
        const currentFolder = context.currentFolder;
        if (folderId !== currentFolder.folderId)
        {
            const folder = await FindFolderByFolderId(folderId);
            context.setCurrentFolder(folder)
            const folders = await FindFoldersByUserIdAndFolderId(folderId);
            const files = await FindFilesOnFolder(folderId)

            context.setFolderView(folders)
            context.setFileView(files)

            const newTitle = {
                shortName: folder.folderName,
                link: folder.folderPath,
                folderId: folder.folderId
            }

            context.setTitle(prev => [...prev, newTitle])
        }
    };
    const handleLinkClick = async (link, titleItem) =>
    {
        await ChangeDirectory(titleItem.folderId)

        if (context.title[context.title.length - 1].link === titleItem.link)
            return

        const items = [];

        let found = false;

        for (let i = 0; i < context.title.length; ++i)
        {
            if (context.title[i].link === titleItem.link)
            {
                found = true;
                items.push(context.title[i]);
                break
            }

            if (!found || (found && context.title[i].link !== titleItem.link))
            {
                items.push(context.title[i]);
            }
        }

        context.setTitle(items);
    };

    // close popup screen
    const ClosePopupHandler = async () =>
    {
        setIsCreateFolder(false)
    };
    const HandleCreateFolder = () =>
    {
        setIsCreateFolder(true)
    };
    const HandleUploadFiles = () =>
    {
        setIsClickUploadFile(!isClickUploadFile)
    };

    const HandleSortFilesByFileSize = async () =>
    {
        let folderId = context.rootFolder.folder_id

        if (context.currentFolder)
            folderId = context.currentFolder.folderId

        const data = await SortFilesByFileSize(folderId)

        context.setFileView(data.files)
    };
    const HandleSortFilesByCreationDate = async () =>
    {
        let folderId = context.rootFolder.folder_id

        if (context.currentFolder)
            folderId = context.currentFolder.folderId

        const data = await SortFilesByCreationDate(folderId)

        context.setFileView(data.files)
    };
    const HandleHomeButton = () =>
    {
        window.location.href = "/home";
    };
    const HandleUploadFolders = () =>
    {
        setIsClickUploadFolder(!isClickUploadFolder)
    };
    return (
        <div>
            {isClickUploadFile && <UploadComponentFiles/>}
            <div>
                <Navbar expand="sm" data-bs-theme="dark"
                        style={{
                            marginTop: "10px",
                            marginBottom: "-35px",
                            backgroundColor: "#272727",
                            height: "35px",
                            fontSize: "12pt",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                    <Container>
                        <Navbar.Brand href="#home" style={{color: "#D2D2D2", fontSize: "12pt", marginTop: "20px"}}>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb d-flex">
                                    <Context.Consumer>
                                        {context => (
                                            <>
                                                <div className="breadcrumb-item">
                                                    <img src={folder_image} alt="home" width="25px" height="26px"
                                                         style={{marginBottom: "6px"}}/>
                                                    <span onClick={HandleHomeButton}
                                                          style={{marginLeft: "4px"}}>Home</span>
                                                </div>
                                                {context.title.map((titleItem, index) => (
                                                    <li className="breadcrumb-item" key={index}>

                                                        <img src={folder_image} alt="home" width="25px"
                                                             height="29px"
                                                             style={{marginBottom: "6px"}}/>
                                                        <span
                                                            onClick={async () => await handleLinkClick(titleItem.link, titleItem)}>
                                                            {titleItem.shortName}
                                                          {/*  <Link to={`${titleItem.shortName ? `${titleItem.shortName}/` : ''}`}/>*/}
                                                        </span>
                                                    </li>
                                                ))}
                                            </>
                                        )}
                                    </Context.Consumer>
                                </ol>
                            </nav>


                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto my-2 my-lg-0">

                            </Nav>
                            <Nav className="ml-auto" id="navbar-menu">
                                <Nav.Link id="create-folder" style={{color: "#b2b2b2"}} href="#"
                                          onClick={HandleCreateFolder}>Create
                                    Folder</Nav.Link>
                                <Nav.Link disabled={true}>|</Nav.Link>
                                <Nav.Link id="upload-file" style={{color: "#b2b2b2"}} href="#"
                                          onClick={HandleUploadFiles}>Upload
                                    Files</Nav.Link>

                                <Nav.Link disabled={true}>||</Nav.Link>

                                <NavDropdown title="View" id="view-type">

                                    <NavDropdown.Item
                                                      id="grid-view"
                                                      style={{backgroundColor: "#272727"}}
                                                      href="#"
                                                      onClick={() =>
                                                      {
                                                          context.setMainView(ViewStatus.GRID);
                                                          context.setTitle([])
                                                      }}>

                                        Grid
                                    </NavDropdown.Item>


                                    <NavDropdown.Item style={{backgroundColor: "#272727"}}
                                                      id="table-view"
                                                      href="#"
                                                      onClick={async () =>
                                                      {
                                                          context.setMainView(ViewStatus.TABLE);
                                                          context.setTitle([])
                                                      }}>
                                        Table
                                    </NavDropdown.Item>

                                </NavDropdown>
                                <Nav.Link disabled={true}>|</Nav.Link>
                                <NavDropdown title="Sort By" id="sort-by">
                                    <NavDropdown.Item id="sort-date"
                                                      style={{backgroundColor: "#272727"}}
                                                      href="#"
                                                      onClick={HandleSortFilesByCreationDate}>
                                        Date
                                    </NavDropdown.Item>
                                    <NavDropdown.Item style={{backgroundColor: "#272727"}}
                                                      id="sort-file_size"
                                                      href="#"
                                                      onClick={HandleSortFilesByFileSize}>
                                        File Size</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link disabled={true}>|</Nav.Link>
                                <NavDropdown title="Filter By" id="filter-by">
                                    {extensions.map(extension => (
                                        <NavDropdown.Item
                                            id="filter-by-extension"
                                            key={extension}
                                            style={{
                                                backgroundColor: "#272727",
                                                color: selectedExtension === extension ? 'white' : '#b2b2b2'
                                            }}
                                            onClick={() => handleExtensionSelect(extension)}
                                        >
                                            {extension}
                                        </NavDropdown.Item>
                                    ))}
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item style={{backgroundColor: "#272727", color: 'white'}}
                                                      onClick={handleFilter}>
                                        Apply Filter
                                    </NavDropdown.Item>
                                </NavDropdown>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>

                </Navbar>
            </div>
            {isCreateFolder && <PopupRename onClose={async () => await ClosePopupHandler()} isNewFolder={true}/>}
        </div>
    );
}
export default OptionsNavBar;
